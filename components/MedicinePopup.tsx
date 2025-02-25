import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import FormInput from './FormInput';
import FormButtons from './FormButtons';
import Toast from 'react-native-toast-message';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Medication, Unit } from '@/backend/types';
import { addMedicine } from '@/backend/data';
import * as Notifications from 'expo-notifications';

function MedicineBasicDetails({ onNext, setData, setErrors }: {
  onNext: () => void,
  setData: Dispatch<SetStateAction<Record<string, string>>>,
  setErrors: Dispatch<SetStateAction<Record<string, string>>>,
}) {
  const validateMedName = (medName: string, shouldValidate: boolean) => {
    if (shouldValidate) {
      if (medName.length == 0) {
        return "Please type the medicine name";
      }
    }
    return "";
  }
  const validateMedAmount = (medAmount: string, shouldValidate: boolean) => {
    if (shouldValidate) {
      if (medAmount.length == 0) {
        return "Please type the medicine amount";
      }
    }
    return "";
  }

  return <>
    <View style={styles.header}>
      <Text style={styles.title}>Add a medicine</Text>
    </View>

    <FormInput
      dataKey={"medName"}
      setData={setData}
      setErrors={setErrors}
      validate={validateMedName}
      placeholder={"Medicine Name"} />
    <FormInput
      dataKey={"medAmount"}
      setData={setData}
      setErrors={setErrors}
      validate={validateMedAmount}
      placeholder={"Medicine Amount (e.g., pills or spoons)"} />

    <FormButtons backShown={false} nextHandler={onNext} />
  </>
}

const dayInMillis = 1000 * 60 * 60 * 24;
function MedicineNextTime({ onBack, onNext, nextTime, setNextTime }: {
  onBack: () => void,
  onNext: () => void,
  nextTime: Date,
  setNextTime: Dispatch<SetStateAction<Date>>
}) {
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(false);

  function updateDate(e: DateTimePickerEvent) {
    setShowDate(false);
    if (e.type == 'set') {
      setShowTime(true);
      setNextTime(prev => {
        const newDateMillis = new Date(e.nativeEvent.timestamp).getTime();
        return new Date(prev.getTime() % dayInMillis + newDateMillis - (newDateMillis % dayInMillis))
      })
    }
  }

  function updateTime(e: DateTimePickerEvent) {
    setShowTime(false);
    if (e.type == 'set') {
      setNextTime(prev =>
        new Date(prev.getTime() - (prev.getTime() % dayInMillis) + new Date(e.nativeEvent.timestamp).getTime() % dayInMillis))
    }
  }

  function openDatePicker() {
    setShowDate(true);
  }

  const hours = nextTime.getHours();
  const formattedDate = `${nextTime.toDateString()} - ${hours % 12 < 10 && (hours % 12) != 0 ? '0' : ''}${(hours % 12) == 0 ? '12' : hours % 12}:${nextTime.getMinutes()} ${hours >= 12 ? 'PM' : 'AM'}`;
  return <>
    <View style={styles.header}>
      <Text style={styles.title}>First dose date</Text>
    </View>

    <TouchableOpacity onPress={openDatePicker}>
      <Text style={styles.doseDateInput}>{formattedDate}</Text>
    </TouchableOpacity>
    {showDate && <RNDateTimePicker minimumDate={new Date()} value={nextTime} onChange={updateDate} />}
    {showTime && <RNDateTimePicker minimumDate={new Date()} value={nextTime} onChange={updateTime} mode={"time"} />}

    <FormButtons backShown={false} nextHandler={onNext} />
  </>
}

function MedicineFrequency({ onBack, onNext, freq, setFreq }: {
  onBack: () => void,
  onNext: () => void,
  freq: Medication['frequency'],
  setFreq: Dispatch<SetStateAction<Medication['frequency']>>,
}) {
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [selectedUnit, setSelectedUnit] = useState<Unit>('one-time');

  function changeUnit(itemValue: Unit, itemIndex: number) {
    setSelectedUnit(itemValue)
    if (itemValue == 'one-time') {
      setFreq(itemValue);
    } else {
      setFreq(`${selectedNumber}${itemValue}`);
    }
  }

  function changeNumber(itemValue: number, itemIndex: number) {
    setSelectedNumber(itemValue);
    setFreq(`${itemValue}${selectedUnit}`);
  }

  return <>
    <View style={styles.header}>
      <Text style={styles.title}>Dose frequency</Text>
    </View>

    <View style={{ justifyContent: 'center', flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
      {selectedUnit != 'one-time' && <>
        <Text style={{
          flex: 1,
          textAlign: 'center',
          fontSize: 16
        }}>Every</Text>
        <Picker
          style={{
            maxWidth: "50%",
            flex: 2,
            backgroundColor: '#eee'
          }}
          selectedValue={selectedNumber}
          onValueChange={changeNumber}>
          {
            Array(selectedUnit == 'd' ? 30 : selectedUnit == 'h' ? 24 : 1).fill(0).map((item, index) => {
              return <Picker.Item key={(index + 1)} label={(index + 1).toString()} value={(index + 1)} />
            })
          }
        </Picker>
      </>
      }

      <Picker
        style={{
          maxWidth: "50%",
          flex: 3,
          backgroundColor: '#eee'
        }}
        selectedValue={selectedUnit}
        onValueChange={changeUnit}>
        <Picker.Item label="One Time" value="one-time" />
        <Picker.Item label="Hours" value="h" />
        <Picker.Item label="Days" value="d" />
      </Picker>
    </View>

    <FormButtons backHandler={onBack} nextHandler={onNext} nextStyle={{
      backgroundColor: "#27ae60"
    }} nextText='Complete' />
  </>
}

async function sceduleNotification(name: string, amount: string, date: Date) {
  await Notifications.scheduleNotificationAsync({
    identifier: name,
    content: {
      title: `Time to take your medicine`,
      body: `Take ${amount} of ${name}`,
      color: "#16a085"
    },
    trigger: {
      channelId: 'medicine_notification',
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: date
    },
  });
}

function MedicinePopup({ handleFinish }: { handleFinish: () => void }) {
  const [data, setData] = useState<Record<string, string>>({
    medName: "",
    medAmount: ""
  });
  const [_, setErrors] = useState<Record<string, string>>({
    medName: "some",
    medAmount: "some"
  });
  const [nextTime, setNextTime] = useState(new Date("2025-02-24T10:54:24.667Z"));
  const [freq, setFreq] = useState<Medication['frequency']>("one-time");
  const first = useRef(true);

  const [step, setStep] = useState(0);
  const changed = useRef(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    changed.current = true;
  }, [data, nextTime, freq])

  function nextStep() {
    setStep(prev => prev + 1)
  }

  function prevStep() {
    setStep(prev => prev - 1)
  }

  async function submit() {
    if (data.medName == "" || data.medAmount == "") {
      Toast.show({
        type: 'error',
        text1: 'You should fill all inputs',
        position: 'bottom',
        bottomOffset: 110
      });
      setStep(0);
    } else if (nextTime.getTime() < new Date().getTime()) {
      Toast.show({
        type: 'error',
        text1: 'Please choose a time in the future',
        position: 'bottom',
        bottomOffset: 110
      });
      setStep(1);
    } else {
      if (await addMedicine(data.medName, data.medAmount, freq, nextTime.getTime())) {
        if(freq == 'one-time')
          await sceduleNotification(data.medName, data.medAmount, nextTime)
        else {
          for(let i = 0; i < 10; i++) {
            const unit = freq.at(-1);
            const interval = Number(freq.slice(0, -1)) * (unit == 'd' ? 1000 * 60 * 60 * 24 : unit == 'h'? 1000 * 60 * 60 : 1000 * 60) ;
            await sceduleNotification(data.medName, data.medAmount, new Date(nextTime.getTime() + i * interval))
          }
        }

        Toast.show({
          type: 'success',
          text1: 'A new medicine was added successfully',
          position: 'bottom',
          bottomOffset: 110
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error adding the new medicine',
          position: 'bottom',
          bottomOffset: 110
        })
      }

      handleFinish();
    }
  }

  function handleClose() {
    if (changed.current) {
      Alert.alert("Are you sure?", "Changes will be discarded", [
        {
          text: "Cancel",
        },
        {
          text: "Discard",
          onPress: () => {
            handleFinish();
          }
        }
      ], {
        cancelable: true,
      })
    } else {
      handleFinish();
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.overaly}>
        <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
          <View style={styles.container}>
            {step == 0 && <MedicineBasicDetails onNext={nextStep} setData={setData} setErrors={setErrors} />}
            {step == 1 && <MedicineNextTime onBack={prevStep} onNext={nextStep} nextTime={nextTime} setNextTime={setNextTime} />}
            {step == 2 && <MedicineFrequency onBack={prevStep} onNext={submit} freq={freq} setFreq={setFreq} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  overaly: {
    position: 'absolute',
    inset: 0,
    backgroundColor: "#0005",
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 20,
    width: "90%"
  },
  header: {
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  title: {
    fontSize: 24,
    fontWeight: 500
  },
  doseDateInput: {
    backgroundColor: "#eee",
    padding: 15,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 10
  }
});

export default MedicinePopup
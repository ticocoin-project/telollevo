import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './home/Home'
import HomeD from './driver/Home'


export default function RootHome() {
    const [step, setStep] = useState('home');

    function cClient(){
      setStep('home')
    }

    function cDriver(){
      setStep('conductor')
    }

  return (
    <>
      {step==='home' && (
          <Home cDriver={()=>cDriver()} />
       )}
       {step==='conductor' && (
          <HomeD cClient={()=>cClient()} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

🚀 SPRINT HANDOVER: Sprint 6.2 – Native Call Control & Truecaller-Style Overlay

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

Instructions for Agent: Create the following folder structure if it does not exist.

Android (Native)

android/app/src/main/java/com/calltrust/telecom/

android/app/src/main/java/com/calltrust/overlay/

android/app/src/main/java/com/calltrust/nativebridge/

React Native

src/components/call/

src/screens/call/

src/navigation/

src/styles/

🛠 2. DEPENDENCY INJECTION

Instructions for Agent: Run these terminal commands immediately. Do not prompt for permission.

npm install react-native-permissions
npm install react-native-reanimated
npm install react-native-gesture-handler
cd android && ./gradlew clean

📄 3. FILE IMPLEMENTATION
File: android/app/src/main/AndroidManifest.xml

Type: XML

<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.ANSWER_PHONE_CALLS"/>
<uses-permission android:name="android.permission.CALL_PHONE"/>
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.BIND_CALL_SCREENING_SERVICE"/>
<uses-permission android:name="android.permission.BIND_INCALL_SERVICE"/>

<application>
    <service
        android:name=".telecom.CallTrustCallScreeningService"
        android:permission="android.permission.BIND_CALL_SCREENING_SERVICE">
        <intent-filter>
            <action android:name="android.telecom.CallScreeningService"/>
        </intent-filter>
    </service>

    <service
        android:name=".telecom.CallTrustInCallService"
        android:permission="android.permission.BIND_INCALL_SERVICE"
        android:exported="true">
        <intent-filter>
            <action android:name="android.telecom.InCallService"/>
        </intent-filter>
    </service>

    <service
        android:name=".overlay.CallOverlayService"
        android:foregroundServiceType="phoneCall"/>

</application>

File: android/app/src/main/java/com/calltrust/telecom/CallTrustCallScreeningService.kt

Type: Kotlin

package com.calltrust.telecom

import android.telecom.Call
import android.telecom.CallScreeningService

class CallTrustCallScreeningService : CallScreeningService() {

    override fun onScreenCall(details: Call.Details) {
        val number = details.handle.schemeSpecificPart
        val isSpam = SpamEngine.evaluate(number)

        val response = CallResponse.Builder()
            .setDisallowCall(isSpam)
            .setRejectCall(isSpam)
            .setSkipNotification(isSpam)
            .build()

        respondToCall(details, response)
    }

}

File: android/app/src/main/java/com/calltrust/telecom/CallTrustInCallService.kt

Type: Kotlin

package com.calltrust.telecom

import android.telecom.Call
import android.telecom.InCallService
import com.calltrust.overlay.CallOverlayService

class CallTrustInCallService : InCallService() {

    override fun onCallAdded(call: Call) {
        CallManager.set(call)
        CallOverlayService.show(applicationContext, call)
    }

    override fun onCallRemoved(call: Call) {
        CallManager.clear()
        CallOverlayService.hide(applicationContext)
    }

}

File: android/app/src/main/java/com/calltrust/telecom/CallManager.kt

Type: Kotlin

package com.calltrust.telecom

import android.telecom.Call

object CallManager {
var currentCall: Call? = null
private set

    fun set(call: Call) {
        currentCall = call
    }

    fun answer() {
        currentCall?.answer(0)
    }

    fun reject() {
        currentCall?.disconnect()
    }

    fun clear() {
        currentCall = null
    }

}

File: android/app/src/main/java/com/calltrust/overlay/CallOverlayService.kt

Type: Kotlin

package com.calltrust.overlay

import android.app.Service
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.view.WindowManager
import android.view.LayoutInflater
import com.calltrust.R
import com.calltrust.telecom.CallManager

class CallOverlayService : Service() {

    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: android.view.View

    override fun onCreate() {
        super.onCreate()
        windowManager = getSystemService(Context.WINDOW_SERVICE) as WindowManager
        overlayView = LayoutInflater.from(this).inflate(R.layout.call_overlay, null)

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        windowManager.addView(overlayView, params)
    }

    override fun onDestroy() {
        super.onDestroy()
        windowManager.removeView(overlayView)
    }

    override fun onBind(intent: Intent?) = null

    companion object {
        fun show(context: Context, call: android.telecom.Call) {
            context.startService(Intent(context, CallOverlayService::class.java))
        }

        fun hide(context: Context) {
            context.stopService(Intent(context, CallOverlayService::class.java))
        }
    }

}

File: src/components/call/IncomingCallOverlay.tsx

Type: TypeScript

import { View, Text, TouchableOpacity } from 'react-native'
import NativeCallModule from '../../native/NativeCallModule'

export default function IncomingCallOverlay({ caller }) {
return (
<View>
<Text>{caller.name || caller.number}</Text>
<Text>Spam Risk Detected</Text>

      <TouchableOpacity onPress={() => NativeCallModule.answer()}>
        <Text>Answer</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => NativeCallModule.reject()}>
        <Text>Reject</Text>
      </TouchableOpacity>
    </View>

)
}

✅ 4. SPRINT ACCEPTANCE CRITERIA

App is default phone app

Incoming calls invoke CallScreeningService

Spam calls are blocked or flagged

Overlay appears above lock screen

User can answer and reject calls

React Native UI is driven by native events

No Expo Go dependency

Works on real Android device

🔐 5. COMPLIANCE NOTES

Android Telecom APIs used. Fully compliant.

No accessibility abuse.

No hidden background interception.

User-granted roles only.

🚧 6. BLOCKERS IF ANY ROLE IS MISSING

If any of the following are not granted, Sprint 6.2 is considered FAILED:

Default phone app role

Call screening role

Overlay permission

Phone permission group

🚀 SPRINT 7.3–7.4

Feature Name: Default Phone & Spam Caller Integration
Source: CallTrust Architecture
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

android/app/src/main/java/com/gaosiwem/mobile/telecom/

CallTrustCallScreeningService.kt

CallTrustInCallService.kt

CallTrustRoleManager.kt

android/app/src/main/java/com/gaosiwem/mobile/bridge/

CallRoleBridgeModule.kt

CallRoleBridgePackage.kt

android/app/src/main/AndroidManifest.xml

🛠 2. DEPENDENCY INJECTION

# Ensure Kotlin, React Native, and Expo dependencies are installed

npm install react-native-device-info
npm install react-native-bridge-module

📄 3. FILE IMPLEMENTATION
File: CallTrustRoleManager.kt
package com.gaosiwem.mobile.telecom

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Build
import android.telecom.TelecomManager
import android.util.Log
import android.app.role.RoleManager

class CallTrustRoleManager(private val context: Context) {

    companion object {
        const val REQUEST_CODE_DEFAULT_PHONE = 1001
        const val REQUEST_CODE_DEFAULT_SCREENING = 1002
    }

    fun isDefaultPhoneApp(): Boolean {
        val telecomManager = context.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
        val defaultDialer = telecomManager.defaultDialerPackage
        return defaultDialer == context.packageName
    }

    fun isDefaultSpamApp(): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = context.getSystemService(RoleManager::class.java)
            return roleManager.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)
        }
        return false
    }

    fun requestDefaultPhoneRole(activity: Activity) {
        if (!isDefaultPhoneApp()) {
            val telecomManager = context.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
            val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
            intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, context.packageName)
            activity.startActivityForResult(intent, REQUEST_CODE_DEFAULT_PHONE)
        }
    }

    fun requestDefaultSpamRole(activity: Activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = context.getSystemService(RoleManager::class.java)
            if (!isDefaultSpamApp()) {
                val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                activity.startActivityForResult(intent, REQUEST_CODE_DEFAULT_SCREENING)
            }
        }
    }

}

File: CallRoleBridgeModule.kt
package com.gaosiwem.mobile.bridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.app.Activity
import com.gaosiwem.mobile.telecom.CallTrustRoleManager

class CallRoleBridgeModule(reactContext: ReactApplicationContext) :
ReactContextBaseJavaModule(reactContext) {

    private val roleManager = CallTrustRoleManager(reactContext.applicationContext)

    override fun getName(): String {
        return "CallRoleManager"
    }

    @ReactMethod
    fun isDefaultPhoneApp(promise: Promise) {
        promise.resolve(roleManager.isDefaultPhoneApp())
    }

    @ReactMethod
    fun isDefaultSpamApp(promise: Promise) {
        promise.resolve(roleManager.isDefaultSpamApp())
    }

    @ReactMethod
    fun requestDefaultPhoneRole() {
        val activity: Activity? = currentActivity
        activity?.let {
            roleManager.requestDefaultPhoneRole(it)
        }
    }

    @ReactMethod
    fun requestDefaultSpamRole() {
        val activity: Activity? = currentActivity
        activity?.let {
            roleManager.requestDefaultSpamRole(it)
        }
    }

}

File: CallRoleBridgePackage.kt
package com.gaosiwem.mobile.bridge

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class CallRoleBridgePackage : ReactPackage {
override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
return listOf(CallRoleBridgeModule(reactContext))
}

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

}

File: AndroidManifest.xml (update snippet)
<service
    android:name=".telecom.CallTrustCallScreeningService"
    android:permission="android.permission.BIND_CALL_SCREENING_SERVICE"
    android:label="CallTrust"
    android:directBootAware="true"
    android:exported="true">
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
<meta-data android:name="android.telecom.IN_CALL_SERVICE_UI" android:value="false" />
</service>

File: App.js (React Native integration example)
import { NativeModules } from 'react-native';

const { CallRoleManager } = NativeModules;

// Check roles
CallRoleManager.isDefaultPhoneApp().then(console.log);
CallRoleManager.isDefaultSpamApp().then(console.log);

// Request roles
CallRoleManager.requestDefaultPhoneRole();
CallRoleManager.requestDefaultSpamRole();

🧪 4. ACCEPTANCE CRITERIA

App can be selected as default phone app

App can be selected as default spam caller ID app

Call events are routed correctly to InCallService and CallScreeningService

Blocking and spam notifications work only if roles are granted

Role status exposed and observable in React Native

SPRINT HANDOVER: Sprint 7.5 – Default Dialer & Spam Caller Integration

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

Instructions for Agent: Create the following folder structure if it does not exist.

src/native/ – For native modules bridging React Native to Android

src/components/

src/screens/

src/navigation/

src/styles/

🛠 2. DEPENDENCY INJECTION

Instructions for Agent: Run these terminal commands immediately.

# Bare workflow (Expo prebuild) for native module access

npx expo prebuild

# Install React Native bridge support

yarn add react-native-permissions

# Android role management helper

yarn add @react-native-community/cli-platform-android

# Rebuild native project

npx react-native run-android --device

📄 3. FILE IMPLEMENTATION
File: src/native/DefaultRoleModule.kt

Kotlin – Native Module to request roles

package com.gaosiwem.mobile.native

import android.app.role.RoleManager
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DefaultRoleModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DefaultRoleModule"
    }

    @ReactMethod
    fun requestDefaultDialer(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = reactApplicationContext.getSystemService(Context.ROLE_SERVICE) as RoleManager
            if (roleManager.isRoleAvailable(RoleManager.ROLE_DIALER) && !roleManager.isRoleHeld(RoleManager.ROLE_DIALER)) {
                val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_DIALER)
                currentActivity?.startActivityForResult(intent, 1001)
                promise.resolve("Role request launched")
            } else {
                promise.resolve("Already default dialer or role not available")
            }
        } else {
            promise.reject("API_NOT_SUPPORTED", "Android version below 10")
        }
    }

    @ReactMethod
    fun requestCallScreening(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = reactApplicationContext.getSystemService(Context.ROLE_SERVICE) as RoleManager
            if (roleManager.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING) && !roleManager.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)) {
                val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                currentActivity?.startActivityForResult(intent, 1002)
                promise.resolve("Call screening role request launched")
            } else {
                promise.resolve("Already call screening role or role not available")
            }
        } else {
            promise.reject("API_NOT_SUPPORTED", "Android version below 10")
        }
    }

}

File: MainApplication.java

Register native module

import com.gaosiwem.mobile.native.DefaultRoleModule;

@Override
protected List<ReactPackage> getPackages() {
List<ReactPackage> packages = new PackageList(this).getPackages();
packages.add(new ReactPackage() {
@Override
public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
return Arrays.<NativeModule>asList(new DefaultRoleModule(reactContext));
}

        @Override
        public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
            return Collections.emptyList();
        }
    });
    return packages;

}

File: src/screens/DefaultRolesScreen.tsx

React Native UI to request roles

import React from "react";
import { View, Button, Alert } from "react-native";
import { NativeModules } from "react-native";

const { DefaultRoleModule } = NativeModules;

export default function DefaultRolesScreen() {
const requestDialer = async () => {
try {
const result = await DefaultRoleModule.requestDefaultDialer();
Alert.alert("Dialer Role", result);
} catch (e) {
Alert.alert("Error", e.message);
}
};

const requestCallScreening = async () => {
try {
const result = await DefaultRoleModule.requestCallScreening();
Alert.alert("Call Screening Role", result);
} catch (e) {
Alert.alert("Error", e.message);
}
};

return (
<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
<Button title="Set as Default Dialer" onPress={requestDialer} />
<Button title="Set as Default Spam/Call Screening" onPress={requestCallScreening} />
</View>
);
}

🔧 4. ANDROID MANIFEST UPDATES
<application>
...
<service
      android:name=".telecom.CallTrustCallScreeningService"
      android:permission="android.permission.BIND_CALL_SCREENING_SERVICE"
      android:exported="true"/>
<service
      android:name=".telecom.CallTrustInCallService"
      android:permission="android.permission.BIND_INCALL_SERVICE"
      android:exported="true"/>
</application>

<uses-permission android:name="android.permission.READ_PHONE_STATE"/>
<uses-permission android:name="android.permission.ANSWER_PHONE_CALLS"/>
<uses-permission android:name="android.permission.CALL_PHONE"/>
<uses-permission android:name="android.permission.BIND_INCALL_SERVICE"/>
<uses-permission android:name="android.permission.BIND_CALL_SCREENING_SERVICE"/>

✅ 5. TESTING

Build a signed APK or run on device using:

npx react-native run-android --device

Open DefaultRolesScreen in the app.

Tap Set as Default Dialer → grant permissions in the system dialog.

Tap Set as Default Spam/Call Screening → grant permissions.

Confirm system Settings → Default Apps shows your app as the default Phone app and default Call Screening app.

Test by receiving a spam call; app overlay should appear.

🧪 6. NOTES

Android 10+ is required for RoleManager.

Ensure bare workflow and signed APK; Expo Go cannot handle system roles.

Users must manually accept the dialogs; the app cannot silently become default.

After this sprint, your app will finally behave like TrueCaller: default phone + spam caller + overlay + answer/reject call.

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
        val activity: Activity? = reactApplicationContext.currentActivity
        activity?.let {
            roleManager.requestDefaultPhoneRole(it)
        }
    }

    @ReactMethod
    fun requestDefaultSpamRole() {
        val activity: Activity? = reactApplicationContext.currentActivity
        activity?.let {
            roleManager.requestDefaultSpamRole(it)
        }
    }

}

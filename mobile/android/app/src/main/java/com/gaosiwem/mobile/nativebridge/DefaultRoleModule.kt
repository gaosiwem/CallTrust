package com.gaosiwem.mobile.nativebridge

import android.app.role.RoleManager
import android.content.Context
import android.content.Intent
import android.os.Build
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
                reactApplicationContext.currentActivity?.startActivityForResult(intent, 1001)
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
                reactApplicationContext.currentActivity?.startActivityForResult(intent, 1002)
                promise.resolve("Call screening role request launched")
            } else {
                promise.resolve("Already call screening role or role not available")
            }
        } else {
            promise.reject("API_NOT_SUPPORTED", "Android version below 10")
        }
    }
}

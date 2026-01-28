package com.gaosiwem.mobile.bridge

import android.app.Activity
import android.content.Intent
import android.os.Build
import android.telecom.TelecomManager
import android.app.role.RoleManager
import android.content.Context
import com.facebook.react.bridge.*

class TelecomModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "TelecomBridge"

    @ReactMethod
    fun answerCall() {
        com.gaosiwem.mobile.telecom.CallManager.answer()
    }

    @ReactMethod
    fun rejectCall() {
        com.gaosiwem.mobile.telecom.CallManager.reject()
    }

    @ReactMethod
    fun hangupCall() {
        com.gaosiwem.mobile.telecom.CallManager.hangup()
    }

    @ReactMethod
    fun requestDefaultDialer() {
        val activity = reactApplicationContext.currentActivity ?: return

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = activity.getSystemService(Context.ROLE_SERVICE) as? RoleManager
            if (roleManager != null && roleManager.isRoleAvailable(RoleManager.ROLE_DIALER)) {
                @Suppress("NULLABILITY_MISMATCH_BASED_ON_JAVA_ANNOTATIONS")
                activity.startActivity(
                    roleManager.createRequestRoleIntent(RoleManager.ROLE_DIALER)
                )
            }
        } else {
            val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
            intent.putExtra(
                TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME,
                activity.packageName
            )
            activity.startActivity(intent)
        }
    }
}

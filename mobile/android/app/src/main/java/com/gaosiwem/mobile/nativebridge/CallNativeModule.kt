package com.gaosiwem.mobile.nativebridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.app.role.RoleManager
import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import com.gaosiwem.mobile.telecom.CallManager

class CallNativeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
    
    private val TAG = "CallNativeModule"

    init {
        com.gaosiwem.mobile.events.CallEventEmitter.reactContext = reactContext
    }

    override fun getName(): String = "CallNative"

    @ReactMethod
    fun answer() {
        CallManager.answer()
    }

    @ReactMethod
    fun reject() {
        CallManager.reject()
    }

    @ReactMethod
    fun setTier(tier: String) {
        com.gaosiwem.mobile.subscription.SubscriptionGuard.tier = tier
    }

    @ReactMethod
    fun requestCallScreeningRole() {
        Log.d(TAG, "requestCallScreeningRole called")
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = reactApplicationContext.getSystemService(Context.ROLE_SERVICE) as RoleManager
            val isAvailable = roleManager.isRoleAvailable(RoleManager.ROLE_CALL_SCREENING)
            val isHeld = roleManager.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)
            
            Log.d(TAG, "Role available: $isAvailable, Role held: $isHeld")
            
            if (isAvailable && !isHeld) {
                try {
                    val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                    reactApplicationContext.currentActivity?.let {
                        Log.d(TAG, "Starting activity for result (code: 42)")
                        it.startActivityForResult(intent, 42)
                    } ?: Log.e(TAG, "Current activity is null!")
                } catch (e: Exception) {
                    Log.e(TAG, "Error creating/starting role intent", e)
                }
            } else if (isHeld) {
                Log.d(TAG, "Role is already held")
            } else {
                Log.w(TAG, "Role is not available on this device")
            }
        } else {
            Log.w(TAG, "Android version too old for RoleManager")
        }
    }

    // Add required methods for NativeEventEmitter
    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}
}

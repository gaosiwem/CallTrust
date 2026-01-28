package com.gaosiwem.mobile.events

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

object CallEventEmitter {
    var reactContext: ReactApplicationContext? = null

    fun emit(event: String, payload: String?) {
        reactContext?.let {
            it.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit(event, payload)
        }
    }
}

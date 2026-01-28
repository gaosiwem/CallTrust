package com.gaosiwem.mobile.bridge

import com.facebook.react.bridge.*
import com.gaosiwem.mobile.telecom.SpamEngine

class SpamBridgeModule(private val ctx: ReactApplicationContext) :
    ReactContextBaseJavaModule(ctx) {

    override fun getName() = "SpamBridge"

    @ReactMethod
    fun getSpamInfo(number: String, promise: Promise) {
        val result = SpamEngine.evaluate(ctx, number)
        val map = Arguments.createMap()

        map.putInt("trustScore", result.trustScore)
        map.putBoolean("isSpam", result.isSpam)
        map.putString("reason", result.reason)

        promise.resolve(map)
    }
}

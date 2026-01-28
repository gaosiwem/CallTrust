package com.gaosiwem.mobile.telecom

import android.telecom.Call
import android.telecom.CallScreeningService

class CallTrustCallScreeningService : CallScreeningService() {

    override fun onScreenCall(details: Call.Details) {
        val number = details.handle?.schemeSpecificPart ?: ""
        val spamResult = SpamEngine.evaluate(applicationContext, number)

        val shouldBlock = RateLimiter.shouldBlock(
            spamResult,
            hasUserInteraction = false
        )

        val response = CallResponse.Builder()
            .setDisallowCall(shouldBlock)
            .setRejectCall(shouldBlock)
            .setSkipNotification(false)
            .setSkipCallLog(false)
            .build()

        respondToCall(details, response)
    }
}

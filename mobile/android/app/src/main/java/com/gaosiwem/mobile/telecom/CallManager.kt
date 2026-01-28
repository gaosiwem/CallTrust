package com.gaosiwem.mobile.telecom

import android.telecom.Call
import android.telecom.VideoProfile

object CallManager {

    private var activeCall: Call? = null

    fun set(call: Call) {
        activeCall = call
    }

    fun clear() {
        activeCall = null
    }

    fun answer() {
        activeCall?.answer(VideoProfile.STATE_AUDIO_ONLY)
    }

    fun reject() {
        activeCall?.disconnect()
    }

    fun hangup() {
        activeCall?.disconnect()
    }

    fun current(): Call? = activeCall

}

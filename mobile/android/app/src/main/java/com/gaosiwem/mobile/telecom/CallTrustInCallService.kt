package com.gaosiwem.mobile.telecom

import android.telecom.Call
import android.telecom.InCallService
import com.gaosiwem.mobile.overlay.CallOverlayService
import com.gaosiwem.mobile.events.CallEventEmitter

class CallTrustInCallService : InCallService() {

    override fun onCallAdded(call: Call) {
        super.onCallAdded(call)
        
        call.registerCallback(object : Call.Callback() {
            override fun onStateChanged(call: Call, state: Int) {
                if (state == Call.STATE_RINGING) {
                    CallManager.set(call)
                    CallEventEmitter.emit(
                        "INCOMING_CALL",
                        call.details.handle?.schemeSpecificPart
                    )
                    CallOverlayService.show(applicationContext, call)
                }
            }
        })
    }

    override fun onCallRemoved(call: Call) {
        super.onCallRemoved(call)
        CallManager.clear()
        CallOverlayService.hide(applicationContext)
    }
}

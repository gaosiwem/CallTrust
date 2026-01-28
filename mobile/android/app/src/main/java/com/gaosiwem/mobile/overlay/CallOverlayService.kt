package com.gaosiwem.mobile.overlay

import android.content.Context
import android.graphics.PixelFormat
import android.os.Build
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView
import android.provider.Settings
import com.gaosiwem.mobile.R
import com.gaosiwem.mobile.telecom.CallManager
import com.gaosiwem.mobile.telecom.SpamEngine

object CallOverlayService {

    private var view: View? = null
    private var windowManager: WindowManager? = null

    fun show(context: Context, call: android.telecom.Call) {
        if (!Settings.canDrawOverlays(context)) return

        windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager

        val params = WindowManager.LayoutParams(
            WindowManager.LayoutParams.MATCH_PARENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            else
                @Suppress("DEPRECATION")
                WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON,
            PixelFormat.TRANSLUCENT
        )

        view = LayoutInflater.from(context).inflate(R.layout.call_overlay, null)

        val spamResult = SpamEngine.evaluate(context, call.details.handle?.schemeSpecificPart ?: "Unknown")

        view!!.findViewById<TextView>(R.id.number).text = spamResult.number
        view!!.findViewById<TextView>(R.id.trust).text = "Trust Score: ${spamResult.trustScore}%"
        view!!.findViewById<TextView>(R.id.reason).text = spamResult.reason ?: "No spam detected"

        view!!.findViewById<Button>(R.id.answer).setOnClickListener {
            CallManager.answer()
        }

        view!!.findViewById<Button>(R.id.reject).setOnClickListener {
            CallManager.reject()
        }

        windowManager!!.addView(view, params)
    }

    fun hide(context: Context) {
        if (view != null && windowManager != null) {
            windowManager!!.removeView(view)
            view = null
        }
    }
}

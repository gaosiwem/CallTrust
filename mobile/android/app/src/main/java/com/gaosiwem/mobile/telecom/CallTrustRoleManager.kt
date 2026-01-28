package com.gaosiwem.mobile.telecom

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.os.Build
import android.telecom.TelecomManager
import android.app.role.RoleManager

class CallTrustRoleManager(private val context: Context) {

    companion object {
        const val REQUEST_CODE_DEFAULT_PHONE = 1001
        const val REQUEST_CODE_DEFAULT_SCREENING = 1002
    }

    fun isDefaultPhoneApp(): Boolean {
        val telecomManager = context.getSystemService(Context.TELECOM_SERVICE) as TelecomManager
        val defaultDialer = telecomManager.defaultDialerPackage
        return defaultDialer == context.packageName
    }

    fun isDefaultSpamApp(): Boolean {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = context.getSystemService(RoleManager::class.java)
            return roleManager != null && roleManager.isRoleHeld(RoleManager.ROLE_CALL_SCREENING)
        }
        return false
    }

    fun requestDefaultPhoneRole(activity: Activity) {
        if (!isDefaultPhoneApp()) {
            val intent = Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER)
            intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, context.packageName)
            activity.startActivityForResult(intent, REQUEST_CODE_DEFAULT_PHONE)
        }
    }

    fun requestDefaultSpamRole(activity: Activity) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            val roleManager = context.getSystemService(RoleManager::class.java)
            if (roleManager != null && !isDefaultSpamApp()) {
                val intent = roleManager.createRequestRoleIntent(RoleManager.ROLE_CALL_SCREENING)
                activity.startActivityForResult(intent, REQUEST_CODE_DEFAULT_SCREENING)
            }
        }
    }

}

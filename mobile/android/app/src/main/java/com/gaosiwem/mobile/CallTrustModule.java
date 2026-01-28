package com.gaosiwem.mobile;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.telecom.TelecomManager;
import androidx.core.content.ContextCompat;
import android.Manifest;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CallTrustModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public CallTrustModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CallTrustModule";
    }

    @ReactMethod
    public void checkOverlayPermission(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            promise.resolve(Settings.canDrawOverlays(reactContext));
        } else {
            promise.resolve(true);
        }
    }

    @ReactMethod
    public void requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(reactContext)) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + reactContext.getPackageName()));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                reactContext.startActivity(intent);
            }
        }
    }

    @ReactMethod
    public void answerCall(Promise promise) {
        TelecomManager telecomManager = (TelecomManager) reactContext.getSystemService(Context.TELECOM_SERVICE);
        if (telecomManager != null) {
            if (ContextCompat.checkSelfPermission(reactContext,
                    Manifest.permission.ANSWER_PHONE_CALLS) == PackageManager.PERMISSION_GRANTED) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    try {
                        telecomManager.acceptRingingCall();
                        promise.resolve(true);
                    } catch (Exception e) {
                        promise.reject("ANSWER_FAILED", e.getMessage());
                    }
                } else {
                    // For older Android versions, this is much harder without ITelephony
                    // reflection,
                    // but we are targeting modern Android mostly.
                    telecomManager.acceptRingingCall();
                    promise.resolve(true);
                }
            } else {
                promise.reject("PERMISSION_DENIED", "ANSWER_PHONE_CALLS permission not granted");
            }
        } else {
            promise.reject("NO_TELECOM_SERVICE", "TelecomManager is null");
        }
    }
}

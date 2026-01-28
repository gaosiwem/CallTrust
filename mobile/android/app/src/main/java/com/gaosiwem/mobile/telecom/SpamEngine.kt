package com.gaosiwem.mobile.telecom

import android.content.Context
import java.util.concurrent.ConcurrentHashMap
import kotlin.math.min

object SpamEngine {

    private val callHistory = ConcurrentHashMap<String, MutableList<Long>>()

    fun evaluate(context: Context, number: String): SpamResult {
        val now = System.currentTimeMillis()
        val history = callHistory.getOrPut(number) { mutableListOf() }

        synchronized(history) {
            history.add(now)
            history.removeIf { now - it > 15 * 60 * 1000 }
        }

        val callCount = history.size

        val trustScore = calculateTrustScore(number, callCount)
        val spamReason = when {
            callCount >= 5 -> "High frequency calls"
            trustScore < 40 -> "Low trust score"
            else -> null
        }

        return SpamResult(
            number = number,
            trustScore = trustScore,
            isSpam = spamReason != null,
            reason = spamReason
        )
    }

    private fun calculateTrustScore(number: String, callCount: Int): Int {
        val baseScore = 100
        val penalty = callCount * 15
        return min(100, (baseScore - penalty).coerceAtLeast(0))
    }

}

package com.gaosiwem.mobile.telecom

object RateLimiter {

    fun shouldBlock(spamResult: SpamResult, hasUserInteraction: Boolean): Boolean {
        return spamResult.isSpam && !hasUserInteraction
    }

}

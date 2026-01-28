package com.gaosiwem.mobile.subscription

object SubscriptionGuard {
    var tier: String = "FREE"

    fun canShowSpamDetails(): Boolean {
        return tier != "FREE"
    }

    fun canAutoBlock(): Boolean {
        return tier == "PRO" || tier == "BUSINESS"
    }

    fun canBusinessInsights(): Boolean {
        return tier == "BUSINESS"
    }
}

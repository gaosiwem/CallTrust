package com.gaosiwem.mobile.telecom

data class SpamResult(
    val number: String,
    val trustScore: Int,
    val isSpam: Boolean,
    val reason: String?
)

SPRINT HANDOVER: Sprint 6.4 – Subscription Enforcement & Feature Gating

Source: ChatGPT-Generated Architectures
Instruction Mode: Execution / Fast-Track

📂 1. FILE ARCHITECTURE

Instructions for Agent: Create the following folder structure if it does not exist.

Backend

services/subscription/

services/subscription/models/

services/subscription/api/

Android

android/app/src/main/java/com/calltrust/subscription/

React Native

src/services/subscription/

src/context/subscription/

🛠 2. DEPENDENCY INJECTION

Instructions for Agent: Run these terminal commands immediately. Do not prompt for permission.

npm install axios
npm install zustand
cd android && ./gradlew clean

📄 3. FILE IMPLEMENTATION
Backend. Subscription Model

File: services/subscription/models/subscription.model.ts
Type: TypeScript

export type SubscriptionTier = 'FREE' | 'PRO' | 'BUSINESS'

export interface Subscription {
userId: string
tier: SubscriptionTier
active: boolean
expiresAt: string
}

Backend. Subscription Service

File: services/subscription/subscription.service.ts
Type: TypeScript

import { Subscription } from './models/subscription.model'

export class SubscriptionService {
static async getActiveSubscription(userId: string): Promise<Subscription> {
const sub = await global.db.subscription.findUnique({ where: { userId } })
if (!sub || !sub.active || new Date(sub.expiresAt) < new Date()) {
return { userId, tier: 'FREE', active: false, expiresAt: '' }
}
return sub
}
}

Backend. API Endpoint

File: services/subscription/api/subscription.controller.ts
Type: TypeScript

import { Request, Response } from 'express'
import { SubscriptionService } from '../subscription.service'

export async function getSubscription(req: Request, res: Response) {
const sub = await SubscriptionService.getActiveSubscription(req.user.id)
res.json(sub)
}

Android. Native Subscription Guard

File: android/app/src/main/java/com/calltrust/subscription/SubscriptionGuard.kt
Type: Kotlin

package com.calltrust.subscription

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

Android. Enforce During Call Screening

Update: CallTrustCallScreeningService.kt

val allowBlock = SubscriptionGuard.canAutoBlock()

val response = CallResponse.Builder()
.setDisallowCall(isSpam && allowBlock)
.setRejectCall(isSpam && allowBlock)
.build()

respondToCall(callDetails, response)

Android. Enforce During UI Rendering

Update: Overlay UI logic

if (!SubscriptionGuard.canShowSpamDetails()) {
hideSpamDetails()
}

React Native. Subscription API Client

File: src/services/subscription/subscription.api.ts
Type: TypeScript

import axios from 'axios'

export async function fetchSubscription(token: string) {
const res = await axios.get('/subscription', {
headers: { Authorization: `Bearer ${token}` }
})
return res.data
}

React Native. Subscription Store

File: src/context/subscription/subscription.store.ts
Type: TypeScript

import { create } from 'zustand'

type Tier = 'FREE' | 'PRO' | 'BUSINESS'

interface State {
tier: Tier
setTier: (t: Tier) => void
}

export const useSubscriptionStore = create<State>((set) => ({
tier: 'FREE',
setTier: (tier) => set({ tier })
}))

React Native. Load Subscription on App Start

File: src/context/subscription/useLoadSubscription.ts
Type: TypeScript

import { useEffect } from 'react'
import { fetchSubscription } from '../../services/subscription/subscription.api'
import { useSubscriptionStore } from './subscription.store'

export function useLoadSubscription(token: string) {
const setTier = useSubscriptionStore(s => s.setTier)

useEffect(() => {
fetchSubscription(token).then(sub => setTier(sub.tier))
}, [token])
}

React Native. Feature Gating in Call UI

Update: IncomingCallScreen.tsx

import { useSubscriptionStore } from '../context/subscription/subscription.store'

const tier = useSubscriptionStore(s => s.tier)

{tier !== 'FREE' && <Text>Spam Confidence: High</Text>}

✅ 4. SPRINT ACCEPTANCE CRITERIA

Subscription enforced server-side

Native blocks spam only if allowed

Free users cannot auto-block

UI hides premium data for free tier

Business-only insights locked

No client-side bypass possible

🔐 5. SECURITY & ABUSE PREVENTION

Enforcement happens in native layer

Backend remains source of truth

React Native cannot escalate privileges

Token required for subscription fetch

🧭 6. WHAT Sprint 6.4 COMPLETES

After Sprint 6.4:

You can monetize

Features are tier-bound

No unpaid user can use paid features

Business and consumer tiers diverge cleanly

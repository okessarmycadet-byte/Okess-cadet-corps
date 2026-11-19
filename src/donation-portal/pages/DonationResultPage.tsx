import { ShieldCheck } from 'lucide-react'

export default function DonationResultPage() {
  return (
    <main className="donation-page">
      <div className="donation-card result-card">
        <ShieldCheck size={42} />
        <p className="eyebrow">PAYMENT STATUS</p>
        <h1>Payment Verification</h1>
        <p>Your payment status will appear here after secure verification.</p>
        <p className="result-reference">Transaction reference will be displayed when available.</p>
      </div>
    </main>
  )
}

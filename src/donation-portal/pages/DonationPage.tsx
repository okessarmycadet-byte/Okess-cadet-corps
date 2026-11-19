import { HeartHandshake, ShieldCheck } from 'lucide-react'

export default function DonationPage() {
  return (
    <main className="donation-page">
      <div className="donation-card">
        <div className="donation-emblem"><HeartHandshake size={32} /></div>
        <p className="eyebrow">OKESS ARMY CADET CORPS</p>
        <h1>Support the Corps</h1>
        <p className="donation-intro">
          Your contribution can help support approved activities and preserve the
          history and heritage of the Corps.
        </p>

        <form className="donation-form">
          <label>Donation amount (GHS)
            <input type="number" min="1" step="0.01" placeholder="Enter amount" />
          </label>
          <label>Name (optional)
            <input type="text" placeholder="Your name" />
          </label>
          <label>Email (optional)
            <input type="email" placeholder="Email for receipt" />
          </label>
          <label className="anonymous-option">
            <input type="checkbox" />
            Make my donation anonymous
          </label>
          <button type="button" className="button-primary">Continue to Payment</button>
        </form>

        <div className="donation-security">
          <ShieldCheck size={16} />
          <span>Secure payment verification will be handled by our payment provider.</span>
        </div>
      </div>
    </main>
  )
}

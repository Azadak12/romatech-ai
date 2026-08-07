// All public-facing marketing copy lives here. Edit freely — components read from this file.

export const company = {
  name: 'RomaTech.Ai',
  tagline: 'AI receptionists for home service businesses',
  contactEmail: 'hello@romatech.ai',
  contactPhone: '(888) 555-0199',
  demoPhone: '(888) 555-0173',
}

export const navLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Demo', href: '#demo' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  headline: "Every Call You Miss Is a Job Your Competitor Just Booked.",
  subheadline:
    "Your AI agent answers every call and every chat, 24 hours a day, qualifies the caller, and books the job straight onto your calendar. No salary, no sick days, no gap after 5pm.",
  primaryCta: { label: 'Hear It In Action', href: '#demo' },
  secondaryCta: { label: 'See Pricing', href: '#pricing' },
  trustStrip: [
    'Answers in under 2 seconds',
    'Keeps your existing number',
    'Live in 7 days',
  ],
}

export const problem = {
  eyebrow: 'The Problem',
  headline: "You're Not Losing Jobs to Bad Work. You're Losing Them to a Phone Nobody Answered.",
  intro:
    "The average home service business misses close to a third of its incoming calls. Every one of those is a customer who already decided they need help today — and most of them have a job booked with someone else before your voicemail even finishes playing.",
  calculator: {
    title: 'See What It Costs You',
    subtitle: "Move the sliders. This is your math, not a sales pitch.",
    inputs: {
      missedCallsPerWeek: {
        label: 'Missed calls per week',
        min: 0,
        max: 100,
        step: 1,
        default: 15,
      },
      avgJobValue: {
        label: 'Average job value',
        prefix: '$',
        min: 50,
        max: 5000,
        step: 25,
        default: 350,
      },
      bookElsewherePct: {
        label: '% of missed callers who book elsewhere',
        suffix: '%',
        min: 0,
        max: 100,
        step: 5,
        default: 60,
      },
    },
    outputLabels: {
      monthly: 'Money lost per month',
      yearly: 'Money lost per year',
    },
    disclaimer: 'Estimate based on the numbers you entered above.',
  },
  cards: [
    {
      icon: 'PhoneMissed',
      headline: 'The Call You Miss Is the Job You Lose',
      body: "A tech is elbow-deep in a job, or it's 8pm on a Tuesday — the phone rings once, goes to voicemail, and that customer is already dialing the next name on Google. They don't call back to give you a second chance.",
    },
    {
      icon: 'Voicemail',
      headline: "Voicemail Doesn't Book Jobs",
      body: "Most callers won't leave a message at all — they just hang up and move on. The few who do leave one are often gone by the time you return the call two hours later.",
    },
    {
      icon: 'Users',
      headline: 'A Receptionist Costs $3,000+ a Month — And Still Clocks Out',
      body: "Salary, payroll tax, training, sick days — and she's still only covering 8-to-5. Every call outside that window goes straight to voicemail anyway.",
    },
    {
      icon: 'Timer',
      headline: 'Web Leads Go Cold in Minutes, Not Hours',
      body: "Someone fills out your contact form on their lunch break and expects a reply before they've finished eating. Call back three hours later and they've already hired whoever called back in three minutes.",
    },
  ],
}

export const solution = {
  eyebrow: 'The Solution',
  headline: 'One Agent. Every Call. Every Chat. Every Time.',
  columns: [
    {
      icon: 'PhoneCall',
      headline: 'Answers',
      body: 'Voice and chat, live 24 hours a day, 7 days a week. Every call is picked up in under 2 seconds — no hold music, no hoping someone happens to be at the desk.',
    },
    {
      icon: 'ClipboardCheck',
      headline: 'Qualifies',
      body: 'Asks the questions your team would ask — job type, location, urgency — and captures every detail so nothing gets lost between the call and the crew.',
    },
    {
      icon: 'CalendarCheck',
      headline: 'Books',
      body: "Writes the job straight into your calendar and CRM. No sticky notes, no games of phone tag, no two trucks sent to the same address.",
    },
  ],
  howItWorks: {
    headline: 'How It Works',
    steps: [
      {
        headline: 'Call or Chat Comes In',
        body: 'A customer calls your number or messages your site. RomaTech picks up immediately, every time — day, night, or weekend.',
      },
      {
        headline: 'AI Answers and Qualifies',
        body: "It introduces your business, asks your intake questions, and gets the job details — location, urgency, what's wrong.",
      },
      {
        headline: 'Job Booked on Your Calendar',
        body: 'The appointment goes straight into your existing calendar and CRM. No manual entry, no re-typing notes from a sticky pad.',
      },
      {
        headline: 'You Get the Notification',
        body: "You and your crew get notified instantly — the job is booked before you'd have even finished picking up the phone yourself.",
      },
    ],
  },
  comparison: {
    headline: 'Manual vs. RomaTech.Ai',
    rows: [
      { label: 'Response time', manual: 'Minutes to hours — if at all', ai: 'Under 2 seconds, every time' },
      { label: 'Hours covered', manual: '~40 hours a week', ai: '168 hours a week' },
      { label: 'Calls handled at once', manual: '1', ai: 'Unlimited, simultaneously' },
      { label: 'Monthly cost', manual: '$3,000+', ai: 'From $250' },
      { label: 'Sick days', manual: 'Yes', ai: 'Never' },
    ],
  },
}

export const demo = {
  eyebrow: 'Hear It Yourself',
  headline: "This Isn't a Demo Voice. This Is the Voice Your Customers Will Hear.",
  tabs: {
    voice: {
      label: 'Voice Agent',
      audioSrc: '/demo/sample-call.mp3',
      caption: 'Live recording — an AI-handled call for an HVAC company, no editing.',
      callCta: {
        label: 'Call Our Demo Line',
        phone: company.demoPhone,
      },
    },
    chat: {
      label: 'Chat Agent',
      caption: 'Scripted example — a stranded driver booking a tow, start to finish.',
      script: [
        { id: 1, sender: 'agent', typingMs: 800, text: "Thanks for reaching out to Ramirez Towing — this is their AI assistant. What's going on tonight?" },
        { id: 2, sender: 'customer', typingMs: 1200, text: "Hey, my car broke down on the highway, I need a tow ASAP" },
        { id: 3, sender: 'agent', typingMs: 1000, text: "Sorry to hear that — let's get you taken care of. Are you somewhere safe, away from traffic?" },
        { id: 4, sender: 'customer', typingMs: 900, text: "Yeah I'm on the shoulder, hazards on" },
        { id: 5, sender: 'agent', typingMs: 1000, text: "Good. What's your location, or the nearest exit or mile marker?" },
        { id: 6, sender: 'customer', typingMs: 1100, text: "I-40 westbound, just past exit 12" },
        { id: 7, sender: 'agent', typingMs: 1200, text: "Got it. What are you driving — make and model, and is it front-wheel, rear-wheel, or all-wheel drive?" },
        { id: 8, sender: 'customer', typingMs: 1000, text: "2019 Honda Accord, front wheel drive" },
        { id: 9, sender: 'agent', typingMs: 1300, text: "Perfect. A flatbed will be there in about 25 minutes. Where should we tow it — a shop, or your home?" },
        { id: 10, sender: 'customer', typingMs: 1100, text: "Tow it to Mike's Auto on 4th Street please" },
        { id: 11, sender: 'agent', typingMs: 1400, text: "Done — you're booked. Flatbed's on the way, ETA 25 minutes, drop-off at Mike's Auto on 4th. You'll get a text with your driver's info." },
        { id: 12, sender: 'customer', typingMs: 700, text: "Awesome, thank you!" },
      ],
    },
  },
}

export const pricing = {
  eyebrow: 'Pricing',
  headline: 'Simple Plans. No Surprises.',
  reframeLine: "The cheapest plan here costs less than one missed $250 job. The math isn't close.",
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      price: 250,
      cadence: '/mo',
      description: 'Get every web chat answered and booked, day or night.',
      limit: '500 conversations/month included',
      mostPopular: false,
      features: [
        'AI chat agent for your website',
        'Basic intake & booking questions',
        'Email notification on every booked job',
        '500 conversations/month included',
        'Standard setup & onboarding call',
      ],
      cta: { label: 'Get Started', href: '/register?plan=starter' },
    },
    {
      id: 'growth',
      name: 'Growth',
      price: 400,
      cadence: '/mo',
      description: 'Add voice, plug into your calendar, and stop missing calls entirely.',
      limit: '1,500 conversations/month included',
      mostPopular: true,
      features: [
        'Everything in Starter',
        'AI voice agent for your main line',
        'CRM & calendar integration',
        '1,500 conversations/month included',
        'After-hours & weekend coverage',
        'Priority chat & email support',
      ],
      cta: { label: 'Get Started', href: '/register?plan=growth' },
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 550,
      cadence: '/mo',
      description: 'For multi-location shops that want every lead followed up on, automatically.',
      limit: '4,000 conversations/month included',
      mostPopular: false,
      features: [
        'Everything in Growth',
        'Outbound follow-up on missed & unbooked leads',
        'Multi-location support',
        'Custom integrations for your stack',
        '4,000 conversations/month included',
        'Priority phone support & dedicated onboarding',
      ],
      cta: { label: 'Talk to Sales', href: '#book-a-call' },
    },
  ],
  setupNote: "One-time $299 setup fee covers number porting, intake script build, and calendar integration.",
  contractNote: 'No long-term contract — cancel anytime with 30 days’ notice.',
}

export const faq = {
  eyebrow: 'FAQ',
  headline: 'Questions Owners Actually Ask',
  items: [
    {
      question: 'Will it sound like a robot?',
      answer:
        "No. It runs on natural, conversational voice technology — customers regularly don't realize they're talking to AI until we tell them. It follows the conversation and responds in real time instead of reading off a fixed script.",
    },
    {
      question: "What if it can't answer a question?",
      answer:
        "It's trained on your services, pricing ranges, and service area. If a question falls outside that, it captures the caller's contact info and urgency and flags it for your team immediately instead of guessing at an answer.",
    },
    {
      question: 'Do I need to change my phone number?',
      answer:
        'No. We connect to your existing business line — nothing changes for your customers, and nothing to reprint on your trucks or website.',
    },
    {
      question: 'How long is setup?',
      answer:
        "Most businesses are live within 7 days. We build your intake script from a short questionnaire and a call with your team, then test it before it ever talks to a real customer.",
    },
    {
      question: 'Does it work with my CRM and calendar?',
      answer:
        "It integrates with the tools most home service businesses already use — Google Calendar, ServiceTitan, Housecall Pro, Jobber, and others. If you're on something else, tell us and we'll check.",
    },
    {
      question: 'What if I want to cancel?',
      answer: "There's no long-term contract. Cancel anytime with 30 days' notice.",
    },
    {
      question: 'Is my customer data safe?',
      answer:
        "Yes. Call and chat data is encrypted in transit and at rest, and it's never sold or used to train models for other companies. It's your data.",
    },
    {
      question: 'What languages does it speak?',
      answer: 'English and Spanish out of the box, with additional languages available on the Premium plan.',
    },
  ],
}

export const finalCta = {
  headline: 'Stop Losing Jobs to a Phone Nobody Answered.',
  body: "Book a 15-minute call. We'll show you exactly how it works on your business, using your numbers.",
  cta: { label: 'Book a Call', href: '#book-a-call' },
}

export const footer = {
  navLinks,
  privacyHref: '#',
  termsHref: '#',
}

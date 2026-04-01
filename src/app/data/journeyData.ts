export interface PainPoint {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Platform {
  id: string;
  name: string;
  description: string;
  currentIssues: string[];
  proposedImprovements: string[];
}

export interface JourneyStep {
  id: string;
  label: string;
}

export interface JourneyStage {
  id: number;
  number: string;
  title: string;
  color: string;
  description: string;
  narrative: {
    decisions: string[];
    communications: string[];
    systems: string[];
  };
  steps: JourneyStep[];
  painPoints: PainPoint[];
  platforms: Platform[];
}

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    number: '01',
    title: 'Research',
    color: '#78BE20',
    description: 'Prospective students find non-degree options via Google, admissions site, or course search. They browse and decide whether to start with a class or the application.',
    narrative: {
      decisions: [
        'Deciding between starting with class exploration vs. formal application',
        'Evaluating if non-degree is the right pathway',
        'Understanding eligibility and requirements'
      ],
      communications: [
        'Marketing emails from ASU',
        'Automated follow-up sequences',
        'Chatbot interactions on admissions site'
      ],
      systems: [
        'Google Search',
        'ASU Admissions Website',
        'Class Search Tool',
        'Marketing automation platform'
      ]
    },
    steps: [
      { id: 'r1', label: 'Consistent policies on landing pages' },
      { id: 'r2', label: 'Finds a class to enroll in' }
    ],
    painPoints: [],
    platforms: [
      {
        id: 'class-search',
        name: 'Class Search',
        description: 'Current tool for browsing available courses',
        currentIssues: [
          'Confusing filters and navigation',
          'No clear indication of non-degree eligibility',
          'Difficult to compare modalities'
        ],
        proposedImprovements: [
          'Simplified filter interface with non-degree toggle',
          'Clear eligibility badges on each course',
          'Side-by-side modality comparison',
          'Save courses for later functionality'
        ]
      },
      {
        id: 'admissions-site',
        name: 'Admissions Website',
        description: 'Main landing page for prospective students',
        currentIssues: [
          'Non-degree pathway buried in navigation',
          'Unclear next steps',
          'Generic content not tailored to non-degree'
        ],
        proposedImprovements: [
          'Prominent non-degree pathway on homepage',
          'Clear journey visualization',
          'Personalized content based on user intent',
          'Direct links to application and class search'
        ]
      }
    ]
  },
  {
    id: 2,
    number: '02',
    title: 'Apply',
    color: '#00A3E0',
    description: 'Students create accounts, navigate branching questions, complete biographical and academic history sections, and submit applications with payment.',
    narrative: {
      decisions: [
        'Choosing the right application type',
        'Determining which information is required vs. optional',
        'Deciding whether to complete the full application now or save for later'
      ],
      communications: [
        'Welcome email upon account creation',
        'Incomplete application reminder emails',
        'Application fee payment confirmation',
        'Application submitted confirmation'
      ],
      systems: [
        'ASU Account System',
        'Admissions Application Portal',
        'Payment Gateway',
        'Student Information System (SIS)'
      ]
    },
    steps: [
      { id: 'a1', label: 'Signs in to apply' },
      { id: 'a2', label: 'Starts application' },
      { id: 'a3', label: 'App started email' },
      { id: 'a4', label: 'Confirms class' },
      { id: 'a5', label: 'Submits app and pays fee' },
      { id: 'a6', label: 'App submitted email' }
    ],
    painPoints: [
      {
        id: 'pp-apply',
        title: 'Submits application and pays fee',
        severity: 'high'
      }
    ],
    platforms: [
      {
        id: 'application-portal',
        name: 'Admissions Application',
        description: 'Online application form for prospective students',
        currentIssues: [
          'Branching logic creates confusion',
          'No clear progress indicator',
          'Requires information that may not be available to non-degree students',
          'Application fee not clearly explained'
        ],
        proposedImprovements: [
          'Streamlined non-degree application with reduced fields',
          'Clear progress bar showing steps remaining',
          'Contextual help and tooltips',
          'Transparent fee breakdown and justification',
          'Auto-save functionality'
        ]
      },
      {
        id: 'account-creation',
        name: 'ASU Account',
        description: 'Single sign-on account creation',
        currentIssues: [
          'Password requirements too complex',
          'No social login options',
          'Account recovery process unclear'
        ],
        proposedImprovements: [
          'Modern password requirements with strength meter',
          'Google/Apple sign-in options',
          'Clear account recovery flow',
          'Account setup wizard'
        ]
      }
    ]
  },
  {
    id: 3,
    number: '03',
    title: 'Decision',
    color: '#FF7F32',
    description: 'Students await system review and propagation, receive admit emails, and become registration eligible.',
    narrative: {
      decisions: [
        'Understanding when to expect a decision',
        'Interpreting the admission decision',
        'Next steps after admission'
      ],
      communications: [
        'Application under review notification',
        'Admission decision email',
        'Next steps email with registration information',
        'SMS notification for time-sensitive updates'
      ],
      systems: [
        'Admissions Review System',
        'Email Platform',
        'SMS Gateway',
        'MyASU Portal'
      ]
    },
    steps: [
      { id: 'd1', label: 'Tracks application status' },
      { id: 'd2', label: 'Admission decision email' }
    ],
    painPoints: [
      {
        id: 'pp-decision',
        title: 'Unclear if credits will transfer',
        severity: 'medium'
      }
    ],
    platforms: [
      {
        id: 'status-portal',
        name: 'Application Status Portal',
        description: 'Real-time view of application progress',
        currentIssues: [
          'Status updates are vague',
          'No estimated timeline provided',
          'Students don\'t know if action is required'
        ],
        proposedImprovements: [
          'Clear status with estimated timeline',
          'Action items prominently displayed',
          'Progress visualization',
          'Proactive notifications for delays'
        ]
      },
      {
        id: 'admit-email',
        name: 'Admission Communications',
        description: 'Email and SMS communications about admission decision',
        currentIssues: [
          'Generic template doesn\'t address non-degree specifics',
          'Next steps buried in long email',
          'No clear call-to-action'
        ],
        proposedImprovements: [
          'Non-degree specific messaging',
          'Clear next steps at the top',
          'Single prominent CTA button',
          'Credit transfer information included'
        ]
      }
    ]
  },
  {
    id: 4,
    number: '04',
    title: 'Register',
    color: '#E74973',
    description: 'Students search and add courses, check eligibility and seat availability, then click through to register or enroll.',
    narrative: {
      decisions: [
        'Which courses to take in first semester',
        'Understanding modality options (online, in-person, hybrid)',
        'Determining if seats are available',
        'Checking prerequisite requirements'
      ],
      communications: [
        'Registration eligibility notification',
        'Course enrollment confirmation',
        'Waitlist notifications',
        'Course start date reminders'
      ],
      systems: [
        'Class Search',
        'MyASU Registration',
        'Shopping Cart',
        'Enrollment System'
      ]
    },
    steps: [
      { id: 'reg1', label: 'Completes enrollment in class' }
    ],
    painPoints: [
      {
        id: 'pp-register',
        title: 'Modality rules unclear',
        severity: 'high'
      }
    ],
    platforms: [
      {
        id: 'class-registration',
        name: 'MyASU Registration',
        description: 'Course registration and enrollment interface',
        currentIssues: [
          'Modality options not clearly explained',
          'Eligibility requirements confusing',
          'Shopping cart process has too many steps',
          'Error messages are technical and unhelpful'
        ],
        proposedImprovements: [
          'Clear modality definitions with icons',
          'Eligibility check before adding to cart',
          'Streamlined one-click enrollment',
          'Plain language error messages with solutions',
          'Visual seat availability indicator'
        ]
      },
      {
        id: 'course-cart',
        name: 'Shopping Cart',
        description: 'Course selection and checkout',
        currentIssues: [
          'Confusing checkout flow',
          'Can\'t easily remove courses',
          'Total credit hours not prominently displayed'
        ],
        proposedImprovements: [
          'E-commerce style cart interface',
          'Easy add/remove functionality',
          'Credit hour summary with tuition estimate',
          'Save cart for later option'
        ]
      }
    ]
  },
  {
    id: 5,
    number: '05',
    title: 'Tuition',
    color: '#FFC627',
    description: 'Students navigate to the Finances tab in MyASU and pay tuition — often with confusion about amounts and timing.',
    narrative: {
      decisions: [
        'Understanding total amount due',
        'Determining payment deadline',
        'Choosing payment method',
        'Deciding whether to use payment plan'
      ],
      communications: [
        'Tuition statement email',
        'Payment deadline reminders',
        'Payment confirmation',
        'Late payment warnings',
        'Payment plan enrollment confirmation'
      ],
      systems: [
        'MyASU Finances Tab',
        'Payment Gateway',
        'Student Accounts System',
        'Payment Plan Platform'
      ]
    },
    steps: [
      { id: 't1', label: 'Payment reminder email' },
      { id: 't2', label: 'Pays tuition' }
    ],
    painPoints: [],
    platforms: [
      {
        id: 'finances-tab',
        name: 'MyASU Finances',
        description: 'Tuition billing and payment interface',
        currentIssues: [
          'Confusing amount breakdowns',
          'Deadlines not prominently displayed',
          'Payment plan options buried',
          'Multiple fees not explained'
        ],
        proposedImprovements: [
          'Clear visual breakdown of charges',
          'Countdown timer to payment deadline',
          'Payment plan comparison tool',
          'Detailed fee explanations with tooltips',
          'Payment history timeline'
        ]
      },
      {
        id: 'payment-gateway',
        name: 'Payment Processing',
        description: 'Secure payment submission',
        currentIssues: [
          'Outdated interface',
          'Limited payment methods',
          'Confirmation page unclear'
        ],
        proposedImprovements: [
          'Modern checkout experience',
          'Multiple payment methods (card, ACH, digital wallets)',
          'Clear confirmation with next steps',
          'Email receipt with transaction details'
        ]
      }
    ]
  }
];

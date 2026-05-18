// server/utils/seedBlogs.js
// Run this file ONCE to add sample blogs
// Command: node utils/seedBlogs.js

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

const sampleBlogs = [
  {
    title: 'Understanding Your Menstrual Cycle',
    excerpt: 'Learn about the 4 phases of your cycle and how they affect your body and mood.',
    content: `Your menstrual cycle is divided into 4 phases:

1. MENSTRUAL PHASE (Days 1-5)
This is when bleeding occurs. Estrogen and progesterone are at their lowest. You may feel tired and need more rest. This is a good time for gentle yoga and self-care.

2. FOLLICULAR PHASE (Days 6-13)
Estrogen rises and you start feeling more energetic. This is the best time for new projects, social activities, and high-intensity workouts.

3. OVULATION PHASE (Days 14-16)
Peak fertility window. You feel most confident and social. Great time for important meetings and dates!

4. LUTEAL PHASE (Days 17-28)
Progesterone rises. You may experience PMS symptoms like bloating, mood swings, and cravings. Focus on self-care and lighter exercise.

Understanding these phases helps you work WITH your body, not against it!`,
    category: 'period',
    tags: ['cycle', 'hormones', 'phases'],
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800'
  },
  {
    title: '10 Foods That Help With Period Cramps',
    excerpt: 'Natural foods that can reduce inflammation and ease menstrual pain.',
    content: `Period cramps affect millions of women. Here are 10 foods that naturally help:

1. DARK CHOCOLATE
Contains magnesium which relaxes muscles and reduces cramping. Choose 70%+ cocoa.

2. GINGER TEA
Powerful anti-inflammatory. Studies show it is as effective as ibuprofen for period pain!

3. TURMERIC
Contains curcumin which reduces inflammation. Add to warm milk for a soothing drink.

4. BANANAS
Rich in potassium and vitamin B6 which reduces bloating and mood swings.

5. SALMON
Omega-3 fatty acids reduce inflammation and period pain significantly.

6. LEAFY GREENS
Spinach and kale are rich in iron (lost during periods) and magnesium.

7. CHAMOMILE TEA
Relaxes uterine muscles and reduces spasms. Drink 2 cups daily.

8. PINEAPPLE
Contains bromelain which relaxes muscles and reduces cramps.

9. WALNUTS
High in omega-3s and magnesium - double benefit for pain relief.

10. WATER
Staying hydrated reduces bloating. Add lemon for extra anti-inflammatory benefits.

Remember: Avoid caffeine, alcohol, and salty foods during your period as they worsen symptoms.`,
    category: 'nutrition',
    tags: ['food', 'cramps', 'nutrition', 'natural'],
    coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800'
  },
  {
    title: 'Managing PMS: A Complete Guide',
    excerpt: 'Evidence-based strategies to manage premenstrual syndrome effectively.',
    content: `PMS affects up to 75% of menstruating women. Here is your complete management guide:

WHAT IS PMS?
PMS (Premenstrual Syndrome) occurs in the luteal phase (days 17-28) due to hormonal fluctuations.

PHYSICAL SYMPTOMS:
- Bloating and water retention
- Breast tenderness
- Headaches
- Fatigue
- Food cravings

EMOTIONAL SYMPTOMS:
- Mood swings
- Anxiety and irritability
- Difficulty concentrating
- Feeling overwhelmed

MANAGEMENT STRATEGIES:

1. EXERCISE REGULARLY
Even 30 minutes of walking releases endorphins that improve mood significantly.

2. TRACK YOUR CYCLE
Use this app to identify your patterns! Knowing when PMS will hit helps you prepare.

3. REDUCE SUGAR AND SALT
These worsen bloating and mood swings dramatically.

4. PRIORITIZE SLEEP
Aim for 8 hours. Sleep deprivation amplifies ALL PMS symptoms.

5. MAGNESIUM SUPPLEMENTS
Studies show 360mg daily reduces anxiety, bloating, and mood swings.

6. STRESS MANAGEMENT
Yoga, meditation, and deep breathing reduce cortisol which worsens PMS.

7. CALCIUM INTAKE
1200mg daily reduces PMS symptoms by up to 48% according to research.

When to see a doctor: If PMS severely impacts your daily life, you may have PMDD (Premenstrual Dysphoric Disorder) which is treatable.`,
    category: 'mental-health',
    tags: ['PMS', 'hormones', 'mental health', 'wellness'],
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
  },
  {
    title: 'Best Exercises for Each Phase of Your Cycle',
    excerpt: 'Sync your workout routine with your hormones for better results.',
    content: `Working out according to your cycle phases maximizes results and reduces injuries!

MENSTRUAL PHASE (Days 1-5) - REST AND GENTLE MOVEMENT
Best exercises: Yoga, walking, stretching, light pilates
Why: Low energy and pain mean your body needs rest
Avoid: HIIT, heavy lifting

FOLLICULAR PHASE (Days 6-13) - BUILD STRENGTH
Best exercises: Weight training, running, cycling, dance classes
Why: Rising estrogen increases strength and endurance
This is your BEST time for personal records!

OVULATION PHASE (Days 14-16) - PEAK PERFORMANCE
Best exercises: High-intensity training, competitions, challenging workouts
Why: Peak testosterone and estrogen means maximum power
Go for your hardest workouts NOW!

LUTEAL PHASE (Days 17-28) - MODERATE INTENSITY
Best exercises: Moderate cardio, swimming, yoga, hiking
Why: Progesterone increases body temperature and reduces performance
Focus on consistency not intensity

BENEFITS OF CYCLE SYNCING WORKOUTS:
- Better results with less effort
- Reduced injury risk
- Improved recovery
- Better mood management
- More sustainable fitness habit

Start tracking your cycle and workouts together in this app to find YOUR personal pattern!`,
    category: 'fitness',
    tags: ['exercise', 'cycle syncing', 'fitness', 'hormones'],
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
  },
  {
    title: 'How Hormones Affect Your Mood and Energy',
    excerpt: 'Understanding estrogen, progesterone, and testosterone and how they change throughout your cycle.',
    content: `Hormones are chemical messengers that control almost everything in your body. Here is how the main ones affect you:

ESTROGEN
- Peaks during follicular phase (days 6-13)
- Makes you feel confident, social, and energetic
- Improves memory and concentration
- Low estrogen causes fatigue, brain fog, and low mood

PROGESTERONE
- Rises in luteal phase (days 17-28)
- Has a calming effect but can cause fatigue
- Causes bloating, breast tenderness
- Drops suddenly before period causing PMS

TESTOSTERONE
- Yes, women have testosterone too!
- Peaks around ovulation
- Increases confidence, libido, and motivation
- Helps build muscle

CORTISOL (Stress Hormone)
- Rises when you are stressed
- Disrupts ALL other hormones
- Can delay or stop ovulation
- Worsens PMS symptoms dramatically

HOW TO BALANCE YOUR HORMONES NATURALLY:

1. SLEEP 7-9 HOURS
Sleep is when your body produces and regulates hormones. Even one bad night raises cortisol by 37 percent!

2. REDUCE SUGAR
Sugar spikes insulin which disrupts estrogen and progesterone balance.

3. EXERCISE REGULARLY
Moderate exercise balances cortisol and boosts feel-good hormones.

4. MANAGE STRESS
Chronic stress is the number 1 hormone disruptor. Try meditation, yoga, or journaling.

5. EAT HEALTHY FATS
Hormones are made FROM fat! Avocado, nuts, and olive oil are essential.

6. LIMIT ALCOHOL
Alcohol raises estrogen levels and disrupts liver function which clears excess hormones.

SIGNS YOUR HORMONES ARE IMBALANCED:
- Irregular periods
- Extreme PMS
- Acne
- Hair loss
- Weight gain
- Mood swings
- Low energy

Track your symptoms in this app to identify hormonal patterns!`,
    category: 'hormones',
    tags: ['hormones', 'estrogen', 'progesterone', 'balance'],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800'
  },
  {
    title: 'Self Care During Your Period — Complete Guide',
    excerpt: 'Simple but powerful self-care practices to make your period more comfortable.',
    content: `Your period is a time to slow down and take care of yourself. Here is your complete self-care guide:

PHYSICAL SELF-CARE:

HEAT THERAPY
A heating pad on your lower abdomen relaxes uterine muscles and reduces cramps by up to 47 percent. Use for 15-20 minutes at a time.

STAY HYDRATED
Drink at least 2-3 litres of water. Herbal teas like chamomile and ginger are especially helpful.

GENTLE MOVEMENT
Light yoga, walking, or stretching releases endorphins that naturally reduce pain. Avoid intense workouts on day 1-2.

NUTRITION
- Eat iron-rich foods (spinach, lentils, red meat)
- Avoid caffeine (worsens cramps)
- Avoid alcohol (increases inflammation)
- Dark chocolate is actually helpful!

SLEEP MORE
Your body is working hard. Give yourself permission to sleep an extra hour.

EMOTIONAL SELF-CARE:

JOURNALING
Write down your feelings. Many women find patterns between their cycle and emotions.

SAY NO
You do not have to do everything. Cancel plans if you need to. Rest is productive.

WARM BATH
Add Epsom salts and lavender oil for muscle relaxation and stress relief.

COMFORT ENTERTAINMENT
Read, watch your favourite show, listen to music. Do things that bring you joy.

TALK TO SOMEONE
If you feel overwhelmed, talk to a friend or therapist. You do not have to suffer alone.

PERIOD KIT ESSENTIALS:
- Heating pad
- Favourite herbal tea
- Dark chocolate
- Comfortable clothes
- Journal
- Good book or show
- Pain relief if needed

Remember: Your period is not a weakness. It is a sign that your body is healthy and working as it should!`,
    category: 'general',
    tags: ['self-care', 'period', 'wellness', 'comfort'],
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    let author = await User.findOne({ role: 'admin' });
    if (!author) {
      author = await User.findOne();
    }

    if (!author) {
      console.log('❌ No users found. Please register first!');
      process.exit(1);
    }

    await Blog.deleteMany({});
    console.log('🗑️ Cleared existing blogs');

    const blogsWithAuthor = sampleBlogs.map(blog => ({
      ...blog,
      author: author._id
    }));

    await Blog.insertMany(blogsWithAuthor);
    console.log(`✅ ${sampleBlogs.length} blogs seeded successfully!`);
    console.log(`👤 Author: ${author.name} (${author.email})`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedBlogs();
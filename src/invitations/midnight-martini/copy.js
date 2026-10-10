import { peachFizzCopy } from '../peach-fizz/copy.js';

export const midnightAssets = {
  artwork: '/images/birthday/midnight-martini/martini-artwork.webp',
  glass: '/images/components/separated/birthday-midnight-martini-martini.webp',
  star: '/images/components/separated/birthday-midnight-martini-gold-star.webp',
};

export const midnightCopy = {
  en: {
    ...peachFizzCopy.en,
    headline: ['LET’S', 'CELEBRATE'], birthday: 'Dea’s birthday',
    details: ['The evening,', 'stirred right.'], detailsLine: 'An intimate celebration of Dea, good food, great people and a few martinis.',
    company: 'Good company. Great nights.',
    schedule: ['Welcome drinks', 'Dinner & toasts', 'Cake & candles', 'One more song'],
    scheduleNotes: ['Arrive, sip, catch up', 'Good food, better people', 'Make a wish', 'Same crowd, later hours'],
    mixTitle: ['Make it', 'a martini.'], mixLine: 'How do you take yours?', mixChoices: ['Olive', 'A little sparkle', 'Extra pink'],
    mixMessages: ['Good choice. Martinis taste better with you here.', 'A little sparkle for a memorable night.', 'A little pink. A lot to celebrate.'],
    cheersButton: 'Cheers to Dea', cheersAgain: 'One more toast', cheersMessage: 'To Dea — here’s to your next great chapter.',
    gamesTitle: ['A little', 'after-hours play.'], gamesLine: 'A few fun moments while we count down to Dea’s big night.',
    gameTabs: ['Toast roulette', 'Birthday quiz'], reveal: 'Reveal a toast', another: 'Another toast',
    toasts: ['To Dea — may your next chapter be even more iconic.', 'To the friends who turn an ordinary night into a favorite memory.', 'To good company, great stories, and the dance floor waiting for us.', 'To another year of making your own kind of magic.', 'To the people who show up, raise a glass, and stay for one more song.', 'To Dea — a little wiser, a little bolder, always worth celebrating.'],
    quizLine: 'Three questions. How party-ready are you?',
    questions: [
      { title: 'What are we celebrating?', options: ['Dea’s birthday', 'New Year', 'A wedding'], answer: 0 },
      { title: 'When do welcome drinks begin?', options: ['18:00', '20:00', '22:30'], answer: 1 },
      { title: 'Which colors set the mood?', options: ['Navy, blush & gold', 'Black & silver', 'Lilac & orange'], answer: 0 },
    ],
    wishes: ['A note', 'worth keeping.'], wishLine: 'Leave a wish for Dea.', message: 'Your wish', saveWish: 'Save your wish',
    wishSignature: ['Good company.', 'Great nights.'],
    join: ['See you', 'after dark.'], joinLine: 'Your seat is waiting.', saveReply: 'Send RSVP',
    thanks: 'See you after dark.', miss: 'We’ll raise a glass to you.',
  },
  ka: {
    ...peachFizzCopy.ka,
    headline: ['მოდი', 'ვიზეიმოთ!'], birthday: 'დეას დაბადების დღე',
    details: ['საღამო,', 'ჩვენებურად.'], detailsLine: 'დეას დაბადების დღე, გემრიელი ვახშამი, საყვარელი ადამიანები და მარტინი.',
    company: 'კარგი ადამიანები. დაუვიწყარი საღამო.',
    schedule: ['შეხვედრა და კოქტეილები', 'ვახშამი და სადღეგრძელოები', 'ტორტი და სანთლები', 'კიდევ ერთი სიმღერა'],
    scheduleNotes: ['მოდი, შევხვდეთ ერთმანეთს', 'ვახშამი კარგ გარემოცვაში', 'ჩაიფიქრე სურვილი', 'საღამო გრძელდება'],
    mixTitle: ['შენი', 'მარტინი.'], mixLine: 'როგორი გიყვარს?', mixChoices: ['ზეთისხილით', 'ცოტა ბრჭყვიალა', 'მეტი ვარდისფერი'],
    mixMessages: ['კარგი არჩევანია. შენთან ერთად უფრო გემრიელია.', 'ცოტა ელვარება დაუვიწყარი საღამოსთვის.', 'ცოტა ვარდისფერი. ბევრი სიხარული.'],
    cheersButton: 'დეას გაუმარჯოს', cheersAgain: 'კიდევ ერთი სადღეგრძელო', cheersMessage: 'დეას და მის ახალ, ბედნიერ წელს გაუმარჯოს!',
    gamesTitle: ['ცოტა', 'გართობა.'], gamesLine: 'რამდენიმე სახალისო წუთი დეას საღამოს მოლოდინში.',
    gameTabs: ['სადღეგრძელოები', 'დაბადების დღის ქვიზი'], reveal: 'გახსენი სადღეგრძელო', another: 'კიდევ ერთი',
    toasts: ['დეას — წინ კიდევ ბევრი დაუვიწყარი ამბავია.', 'მეგობრებს, რომლებიც ჩვეულებრივ საღამოს მოგონებად აქცევენ.', 'კარგ ადამიანებს, კარგ ამბებს და ცეკვას.', 'კიდევ ერთ წელს, სიხარულითა და ოცნებებით სავსეს.', 'მათ, ვინც გვერდით გვყავს და კიდევ ერთ სიმღერას ელოდება.', 'დეას — უფრო თამამს და ყოველთვის გამორჩეულს.'],
    quizLine: 'სამი კითხვა. მზად ხარ წვეულებისთვის?',
    questions: [
      { title: 'რას ვზეიმობთ?', options: ['დეას დაბადების დღეს', 'ახალ წელს', 'ქორწილს'], answer: 0 },
      { title: 'როდის იწყება საღამო?', options: ['18:00', '20:00', '22:30'], answer: 1 },
      { title: 'რომელი ფერები გვიხდება?', options: ['ლურჯი, ვარდისფერი და ოქროსფერი', 'შავი და ვერცხლისფერი', 'იასამნისფერი და ნარინჯისფერი'], answer: 0 },
    ],
    wishes: ['სურვილი', 'სამახსოვროდ.'], wishLine: 'დაუტოვე დეას თბილი სურვილი.', saveWish: 'სურვილის შენახვა',
    wishSignature: ['კარგი ადამიანები.', 'ბედნიერი საღამოები.'],
    join: ['საღამოს', 'გელოდებით.'], joinLine: 'შენი ადგილი გელოდება.', saveReply: 'პასუხის შენახვა',
    thanks: 'საღამოს შევხვდებით.', miss: 'შენც გაგიხსენებთ.',
  },
};

export async function celebrateMidnight() {
  const { default: confetti } = await import('canvas-confetti');
  confetti({ particleCount: 55, spread: 85, colors: ['#e9a8ae', '#dab044', '#faf0d9'], disableForReducedMotion: true });
}

import { selectedBridalCaptions } from "../invitations/data/selectedBridalDesigns.js";
import { pinkChampagneCaptions } from "../invitations/data/pinkChampagneDesigns.js";
import { cocktailBirthdayCaptions } from "../invitations/data/cocktailBirthdayDesigns.js";
import { pizzaBirthdayCaptions } from "../invitations/data/pizzaBirthdayDesigns.js";
import { comicBirthdayCaptions } from "../invitations/data/comicBirthdayDesigns.js";
import { poolBirthdayCaptions } from "../invitations/data/poolBirthdayDesigns.js";
import { girlyBirthdayCaptions } from "../invitations/data/girlyBirthdayDesigns.js";
import { cardCopy } from "./cardCopy.js";

export const defaultLanguage = "ka";
export const languages = ["ka", "en"];
export const languageNames = { ka: "ქართული", en: "English" };

const authCopy = {
  ka: {
    "auth.login.title": "კეთილი იყოს!",
    "auth.login.description": "შენი მომენტები გელოდება.",
    "auth.login.action": "შესვლა",
    "auth.login.alternative": "ახალი ხარ 11:11-ზე?",
    "auth.register.title": "შექმენი ანგარიში",
    "auth.register.description": "შენი მომენტები აქ იწყება.",
    "auth.register.action": "ანგარიშის შექმნა",
    "auth.register.alternative": "უკვე გაქვს ანგარიში?",
    "auth.field.name": "სახელი",
    "auth.field.email": "ელფოსტა",
    "auth.field.password": "პაროლი",
    "auth.field.confirmPassword": "გაიმეორე პაროლი",
    "auth.password.show": "აჩვენე პაროლი — {field}",
    "auth.password.hide": "დამალე პაროლი — {field}",
    "auth.password.hint": "მინიმუმ {passwordLength} სიმბოლო.",
    "auth.validation.required": "გთხოვ, შეავსე ეს ველი.",
    "auth.validation.nameShort":
      "სახელი: მინიმუმ {nameLength} სიმბოლო.",
    "auth.validation.email": "შეიყვანე სწორი ელფოსტა.",
    "auth.validation.passwordShort":
      "პაროლი: მინიმუმ {passwordLength} სიმბოლო.",
    "auth.validation.passwordMatch": "პაროლები არ ემთხვევა.",
    "auth.submission.preview":
      "ეს ფორმის დემოა. შესვლა და ანგარიშის შექმნა სერვერთან დაკავშირების შემდეგ გახდება შესაძლებელი. მონაცემები არ გაგზავნილა და არ შენახულა.",
  },
  en: {
    "auth.login.title": "Welcome back",
    "auth.login.description": "Your special moments are waiting.",
    "auth.login.action": "Sign in",
    "auth.login.alternative": "New to 11:11?",
    "auth.register.title": "Create your account",
    "auth.register.description": "Your special moments start here.",
    "auth.register.action": "Create account",
    "auth.register.alternative": "Already have an account?",
    "auth.field.name": "Name",
    "auth.field.email": "Email",
    "auth.field.password": "Password",
    "auth.field.confirmPassword": "Confirm password",
    "auth.password.show": "Show password — {field}",
    "auth.password.hide": "Hide password — {field}",
    "auth.password.hint": "At least {passwordLength} characters.",
    "auth.validation.required": "Please fill in this field.",
    "auth.validation.nameShort":
      "Use at least {nameLength} characters for your name.",
    "auth.validation.email": "Enter a valid email address.",
    "auth.validation.passwordShort":
      "Use at least {passwordLength} characters for your password.",
    "auth.validation.passwordMatch": "The passwords don’t match.",
    "auth.submission.preview":
      "This is a form preview. Sign in and account creation will be available when the backend is connected. Your details haven’t been sent or saved.",
  },
};

const themeCatalog = [
  [
    "wedding-blush-lift",
    "ვარდისფერი ბუშტები",
    "მარტივი ხაზები და ფერადი აქცენტები",
    "Blush Lift",
    "Simple line art & colored accents",
  ],
  [
    "wedding-little-yes",
    "პატარა თანხმობა",
    "მარტივი ხაზები და ფერადი აქცენტები",
    "Little Yes",
    "Simple line art & colored accents",
  ],
  [
    "wedding-cherry-toast",
    "ალუბლის სადღეგრძელო",
    "მარტივი ხაზები და ფერადი აქცენტები",
    "Cherry Toast",
    "Simple line art & colored accents",
  ],
  [
    "gender-reveal-tiny-footprints",
    "პატარა ნაკვალევი",
    "ბავშვის აკვარელის ნაკვალევი",
    "Tiny Footprints",
    "Watercolor baby footprints",
  ],
  [
    "gender-reveal-little-wonder",
    "პატარა სასწაული",
    "პატარა აკვარელის ფეხსაცმელი და მოხატული ჩარჩო",
    "Little Wonder",
    "Tiny watercolor booties & a painted border",
  ],
  [
    "gender-reveal-bear-hug",
    "დათუნიების ჩახუტება",
    "ორი პატარა ვარდისფერი და ცისფერი დათუნია",
    "Bear Hug",
    "Two little watercolor bears in pink and blue",
  ],
  [
    "gender-reveal-special-delivery",
    "პატარა გზავნილი",
    "ზღაპრული წერო და პატარა სიურპრიზი",
    "Special Delivery",
    "A storybook stork & a little surprise",
  ],
  [
    "gender-reveal-up-in-the-air",
    "ცაში აფრენილი",
    "ვარდისფერი და ცისფერი საჰაერო ბუშტები",
    "Up in the Air",
    "Pink-and-blue hot air balloons",
  ],
  [
    "gender-reveal-little-surprise",
    "პატარა სიურპრიზი",
    "პასტელის ბუშტები და კრემისფერი ქაღალდი",
    "Little Surprise",
    "Pastel balloons & ivory paper",
  ],
  [
    "gender-reveal-ribbon-surprise",
    "ლენტის სიურპრიზი",
    "ორფერი აკვარელის ლენტები",
    "Ribbon Surprise",
    "Two-color watercolor ribbons",
  ],
  [
    "gender-reveal-pink-or-blue",
    "ვარდისფერი თუ ცისფერი",
    "რბილი ზოლები და ლენტის ჩარჩო",
    "Pink or Blue",
    "Soft stripes & a ribbon frame",
  ],
  [
    "wedding-happy-table",
    "მხიარული სუფრა",
    "ფერადი ნახატები და საქორწილო სუფრა",
    "Happy Table",
    "Colorful pen doodles & a wedding table",
  ],
  [
    "wedding-watercolor-banquet",
    "აკვარელის ბანკეტი",
    "ფერადი ნახატები და საქორწილო სუფრა",
    "Watercolor Banquet",
    "Loose watercolor & a wedding banquet",
  ],
  [
    "wedding-ring-and-spark",
    "ბეჭედი და ნაპერწკალი",
    "კალმით დახატული ბეჭდები და ყვითელი ნაპერწკლები",
    "Ring & Spark",
    "Simple ink rings & yellow sparkles",
  ],
  [
    "wedding-golden-promise",
    "ოქროს დაპირება",
    "აკვარელის ბეჭდები და ოქროსფერი ნაპერწკლები",
    "Golden Promise",
    "Watercolor rings & little golden sparkles",
  ],
  [
    "wedding-sweet-snapshot",
    "ტკბილი ჩანახატი",
    "წყვილის მარტივი ნახატი და ვარდისფერი კონვერტი",
    "Sweet Snapshot",
    "Simple couple doodles & a blush envelope",
  ],
  [
    "wedding-portrait-promise",
    "პორტრეტის დაპირება",
    "მარტივი პორტრეტი და ლურჯი ყვავილების ჩარჩო",
    "Portrait Promise",
    "Simple pencil portraits & a blue floral border",
  ],
  [
    "wedding-heartmarked",
    "გულით მონიშნული",
    "ბორდოსფერი სადღეგრძელო და გულით მონიშნული კალენდარი",
    "Heartmarked",
    "Burgundy toasts & a heartmarked calendar",
  ],
  [
    "wedding-colorful-company",
    "ფერადი შეკრება",
    "ფერადი ნახატები და დასამახსოვრებელი თარიღი",
    "Colorful Company",
    "Colorful pencil sketches & a date to keep",
  ],
  [
    "wedding-linked-steps",
    "საერთო ნაბიჯები",
    "ბორდოსფერი ხაზები და საერთო ნაბიჯი",
    "Linked Steps",
    "Burgundy line art & a shared next step",
  ],
  [
    "wedding-garden-table",
    "ბაღის სუფრა",
    "აკვარელის სუფრა და მწვანე ლენტის ჩარჩო",
    "Garden Table",
    "Watercolor dinner & a green ribbon frame",
  ],
  [
    "wedding-ivory-vows",
    "ნაზი აღთქმები",
    "აკვარელის საქორწილო სამოსი და ნაზი ოქროსფერი",
    "Ivory Vows",
    "Watercolor wedding attire & delicate gold",
  ],
  [
    "wedding-ribbon-revel",
    "ლენტების ზეიმი",
    "ფერადი სტუმრები და აკვარელის ლენტები",
    "Ribbon Revel",
    "Colorful watercolor guests & flowing ribbons",
  ],
  [
    "wedding-come-rain-or-shine",
    "წვიმაში თუ მზეში",
    "წყვილი ქარში და კალმით დახატული ქოლგა",
    "Come Rain or Shine",
    "A wind-swept couple & an ink umbrella",
  ],
  [
    "wedding-side-by-side",
    "ერთად",
    "წყვილის პატარა ნახატი და მშვიდი სპილოსძვლისფერი ქაღალდი",
    "Side by Side",
    "A small ink couple & quiet ivory paper",
  ],
  [
    "wedding-rose-letter",
    "ვარდისფერი წერილი",
    "ვარდისფერი აკვარელი და საქორწილო წერილი",
    "Rose Letter",
    "Blush watercolor & a wedding letter",
  ],
  [
    "wedding-sage-letter",
    "სალბისფერი წერილი",
    "სალბისფერი აკვარელი და საქორწილო წერილი",
    "Sage Letter",
    "Sage watercolor & a wedding letter",
  ],
  [
    "wedding-first-dance",
    "პირველი ცეკვა",
    "მოცეკვავე წყვილი და ლენტის ჩარჩო",
    "First Dance",
    "A dancing couple & a ribbon frame",
  ],
  [
    "wedding-happily-away",
    "ბედნიერი მგზავრობა",
    "საქორწილო მანქანა და კალმით დახატული ჩარჩო",
    "Happily Away",
    "A getaway doodle & a playful ink frame",
  ],
  [
    "wedding-our-people",
    "ჩვენი ადამიანები",
    "მარტივი სტუმრების ნახატები და საერთო სიხარული",
    "Our People",
    "Simple cartoon guests & shared joy",
  ],
  [
    "wedding-date-and-dinner",
    "თარიღი და ვახშამი",
    "ლურჯი სუფრა და დასამახსოვრებელი თარიღი",
    "Date & Dinner",
    "A blue-ink table & a date to keep",
  ],
  [
    "wedding-little-vows",
    "პატარა აღთქმები",
    "წყვილის მარტივი ნახატი და წითელი წერილი",
    "Little Vows",
    "Simple couple doodles & red notes",
  ],
  [
    "wedding-celebration-table",
    "სადღესასწაულო სუფრა",
    "კალმის მარტივი ნახატები და საერთო სუფრა",
    "Celebration Table",
    "Simple pen sketches & a shared table",
  ],
  [
    "wedding-day-notes",
    "ქორწილის დღის ჩანაწერები",
    "პასტელის ნახატები და ქორწილის დღის განრიგი",
    "Wedding Day Notes",
    "Pastel doodles & a wedding-day timeline",
  ],
  [
    "wedding-blue-clink",
    "ლურჯი ჭიქები",
    "ლურჯი კალმის სადღეგრძელო",
    "Blue Clink",
    "Blue pen toasts & cream paper",
  ],
  [
    "wedding-tipsy-together",
    "ერთად სადღეგრძელო",
    "ღვინის მხიარული კალმის ნახატები",
    "Tipsy Together",
    "Playful wine-prop pen doodles",
  ],
  [
    "wedding-heart-hideaway",
    "გულის უკან",
    "გული და პატარა საიდუმლო",
    "Heart Hideaway",
    "A heart & a little mystery",
  ],
  [
    "wedding-blue-pour",
    "ლურჯი სადღეგრძელო",
    "ლურჯი მელანი და მხიარული სადღეგრძელო",
    "Blue Pour",
    "Cobalt ink & a playful pour",
  ],
  [
    "wedding-garden-dance",
    "ცეკვა ბაღში",
    "აკვარელის სტუმრები და ბაღის დისკო",
    "Garden Dance",
    "Watercolor guests & garden disco",
  ],
  [
    "wedding-ink-and-ivy",
    "მელანი და სურო",
    "ინდიგოს ილუსტრაციები და ველური ყვავილები",
    "Ink & Ivy",
    "Indigo illustrations & wildflowers",
  ],
  [
    "birthday-pink-post",
    "ვარდისფერი წერილი",
    "ვარდისფერი აკვარელი და პირადი წერილი",
    "Pink Post",
    "Blush watercolor & personal notes",
  ],
  [
    "birthday-disco-scrapbook",
    "დისკოს ალბომი",
    "ფერადი ქაღალდი და დისკოს ბრჭყვიალა",
    "Disco Scrapbook",
    "Cut-paper colors & disco sparkle",
  ],
  [
    "birthday-velvet-post",
    "ბორდოს წერილი",
    "ბორდოს ზოლები და ვარდისფერი მელანი",
    "Velvet Post",
    "Wine stripes & blush ink",
  ],
  [
    "birthday-checkerboard-cheers",
    "კოქტეილების წვეულება",
    "ნარინჯისფერი კვადრატები და კოქტეილები",
    "Checkerboard Cheers",
    "Orange checks & painted cocktails",
  ],
  [
    "birthday-pastel-disco",
    "პასტელის დისკო",
    "პასტელის ბრჭყვიალა დისკო",
    "Pastel Disco",
    "Pastel sparkles & painted disco",
  ],
  [
    "birthday-paper-garland",
    "ფერადი სურვილები",
    "აკვარელის ნაზი ტორტი, გირლანდა და ვარსკვლავები",
    "Watercolor Wishes",
    "Soft watercolor cake, bunting & sparkles",
  ],
  [
    "birthday-strawberry-social",
    "მარწყვის წვეულება",
    "მოხატული ზოლები და მარწყვის ტორტი",
    "Strawberry Social",
    "Painted stripes & strawberry shortcake",
  ],
  [
    "birthday-cobalt-cheers",
    "ლურჯი სადღეგრძელო",
    "ლურჯი მელანი და კოქტეილები",
    "Cobalt Cheers",
    "Blue ink & cocktail cheers",
  ],
  [
    "birthday-ribbon-social",
    "ბორდოს წვეულება",
    "ბორდოს ლენტები და კოქტეილის ესკიზები",
    "Ribbon Social",
    "Burgundy ribbons & cocktail sketches",
  ],
  [
    "birthday-football-club",
    "ფეხბურთის კლუბი",
    "დაბადების დღის საფეხბურთო მატჩი",
    "Football Club",
    "Vintage match-day celebration",
  ],
  [
    "birthday-ballerina",
    "ბალერინა",
    "ნაზი ბალეტი და ჰაეროვანი ტიული",
    "Ballerina",
    "Blush ballet & airy tulle",
  ],
  [
    "birthday-khinkali-beer",
    "ხინკალი და ლუდი",
    "ქართული სუფრა და ოქროსფერი ლუდი",
    "Khinkali & Beer",
    "Georgian food & golden beer",
  ],
  [
    "birthday-space-explorer",
    "კოსმოსის მკვლევარი",
    "პლანეტები და რაკეტები",
    "Space Explorer",
    "Painted planets & rocket dreams",
  ],
  [
    "birthday-dino-adventure",
    "დინო თავგადასავალი",
    "ჯუნგლები და მეგობრული დინოზავრები",
    "Dino Adventure",
    "Jungle leaves & friendly dinosaurs",
  ],
  [
    "birthday-race-day",
    "რბოლის დღე",
    "რეტრო მანქანები და რბოლის დროშები",
    "Race Day",
    "Vintage racers & checkered flags",
  ],
  [
    "birthday-supper-club",
    "ვახშმის კლუბი",
    "ბორდოსფერი და სანთლის შუქი",
    "Supper Club",
    "Burgundy & candlelight",
  ],
  [
    "birthday-modern-toast",
    "თანამედროვე ზეიმი",
    "სპილოსძვლისფერი და ვერცხლი",
    "Modern Toast",
    "Ivory & sculptural silver",
  ],
  [
    "birthday-classic-celebration",
    "კლასიკური დღესასწაული",
    "თბილი და მარადიული",
    "Classic Celebration",
    "Joyful & timeless",
  ],
  [
    "birthday-floral-affair",
    "ყვავილოვანი საღამო",
    "დახვეწილი და ყვავილოვანი",
    "Floral Affair",
    "Refined & blooming",
  ],
  [
    "birthday-retro-disco",
    "რეტრო პოპი",
    "მკვეთრი, მხიარული",
    "Retro Pop",
    "Bold & playful",
  ],
  [
    "birthday-y2k-digital",
    "Y2K წვეულება",
    "ციფრული ნოსტალგია",
    "Y2K Party",
    "Digital nostalgia",
  ],
  [
    "birthday-pink-glam",
    "ვარდისფერი გლამური",
    "ფერებით სავსე წვეულება",
    "Pink Glam",
    "A party in full color",
  ],
  ["birthday-coquette", "კოკეტი", "ნაზი და ტკბილი", "Coquette", "Soft & sweet"],
  [
    "birthday-garden-party",
    "ბაღის წვეულება",
    "ცოცხალი ყვავილები",
    "Garden Party",
    "Fresh & floral",
  ],
  [
    "birthday-pastel-dream",
    "პასტელის ოცნება",
    "ხალისიანი ფერები",
    "Pastel Dream",
    "Lighthearted color",
  ],
  [
    "birthday-tropical-summer",
    "ტროპიკული ზაფხული",
    "მზიანი და ცოცხალი",
    "Tropical Summer",
    "Sunlit & lively",
  ],
  [
    "birthday-painted-summer",
    "მოხატული ზაფხული",
    "ხელით მოხატული სანაპირო",
    "Painted Summer",
    "Hand-painted coast",
  ],
  [
    "birthday-beer-party",
    "ლუდის წვეულება",
    "თბილი საღამო ბარში",
    "Beer Party",
    "Warm bar nights",
  ],
  [
    "wedding-timeless-white",
    "მარადიული თეთრი",
    "კლასიკური სტილი",
    "Timeless White",
    "Classic elegance",
  ],
  [
    "wedding-modern-editorial",
    "თანამედროვე სარედაქციო",
    "გრაფიკული და დახვეწილი",
    "Modern Editorial",
    "Graphic & refined",
  ],
  [
    "wedding-romantic-garden",
    "რომანტიკული ბაღი",
    "ყვავილებით სავსე დღე",
    "Romantic Garden",
    "A day in bloom",
  ],
  [
    "wedding-black-tie",
    "ბლექ ტაი",
    "საზეიმო საღამო",
    "Black Tie",
    "Formal after dark",
  ],
  ["wedding-tuscany", "ტოსკანა", "თბილი და მზიანი", "Tuscany", "Warm & sunlit"],
  [
    "wedding-coastal",
    "სანაპირო",
    "ზღვის ნაზი ჰაერი",
    "Coastal",
    "Soft sea air",
  ],
  [
    "wedding-bohemian",
    "ბოჰემური",
    "ბუნებრივი და გულწრფელი",
    "Bohemian",
    "Earthy & heartfelt",
  ],
  [
    "wedding-vintage-romance",
    "ვინტაჟური რომანტიკა",
    "ძველი დროის ხიბლი",
    "Vintage Romance",
    "Old-world charm",
  ],
  [
    "wedding-celestial",
    "ვარსკვლავური",
    "ვარსკვლავებში დაწერილი",
    "Celestial",
    "Written in the stars",
  ],
  [
    "wedding-modern-botanical",
    "თანამედროვე ბოტანიკა",
    "გამოკვეთილი სიმწვანე",
    "Modern Botanical",
    "Sculptural greenery",
  ],
];

const themeDescriptions = [
  [
    "wedding-blush-lift",
    "მარტივი ხაზოვანი ნახატები და ფერადი აქცენტები მხიარული წვეულებისთვის.",
    "მარტივი · ფერადი · ნახატი",
    "Simple pen outlines with small colored accents for a bridal party.",
    "Simple · colorful · drawn",
  ],
  [
    "wedding-little-yes",
    "მარტივი ხაზოვანი ნახატები და ფერადი აქცენტები მხიარული წვეულებისთვის.",
    "მარტივი · ფერადი · ნახატი",
    "Simple pen outlines with small colored accents for a happy engagement celebration.",
    "Simple · colorful · drawn",
  ],
  [
    "wedding-cherry-toast",
    "მარტივი ხაზოვანი ნახატები და ფერადი აქცენტები მხიარული წვეულებისთვის.",
    "მარტივი · ფერადი · ნახატი",
    "Simple pen outlines with small colored accents for a bridal party.",
    "Simple · colorful · drawn",
  ],
  [
    "gender-reveal-tiny-footprints",
    "ბავშვის აკვარელის ნაკვალევი სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Watercolor baby footprints for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-little-wonder",
    "პატარა აკვარელის ფეხსაცმელი და მოხატული ჩარჩო სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Tiny watercolor booties & a painted border for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-bear-hug",
    "ორი პატარა ვარდისფერი და ცისფერი დათუნია სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Two little watercolor bears in pink and blue for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-special-delivery",
    "ზღაპრული წერო და პატარა სიურპრიზი სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "A storybook stork & a little surprise for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-up-in-the-air",
    "ვარდისფერი და ცისფერი საჰაერო ბუშტები სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Pink-and-blue hot air balloons for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-little-surprise",
    "პასტელის ბუშტები და სპილოსძვლისფერი ქაღალდი სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Pastel balloons & ivory paper for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-ribbon-surprise",
    "ორფერი აკვარელის ლენტები სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Two-color watercolor ribbons for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "gender-reveal-pink-or-blue",
    "რბილი ზოლები და ლენტის ჩარჩო სქესის გაგების მხიარული წვეულებისთვის.",
    "ვარდისფერი · ცისფერი · აკვარელი",
    "Soft stripes & a ribbon frame for a joyful gender reveal gathering.",
    "Pink · blue · hand-painted",
  ],
  [
    "wedding-happy-table",
    "ფერადი ნახატები და საქორწილო სუფრა თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Colorful pen doodles & a wedding table on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-watercolor-banquet",
    "ფერადი ნახატები და საქორწილო სუფრა თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Loose watercolor & a wedding banquet on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-ring-and-spark",
    "კალმით დახატული ბეჭდები და ყვითელი ნაპერწკლები თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Simple ink rings & yellow sparkles on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-golden-promise",
    "აკვარელის ბეჭდები და ოქროსფერი ნაპერწკლები თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Watercolor rings & little golden sparkles on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-sweet-snapshot",
    "წყვილის მარტივი ნახატი და ვარდისფერი კონვერტი თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Simple couple doodles & a blush envelope on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-portrait-promise",
    "მარტივი პორტრეტი და ლურჯი ყვავილების ჩარჩო თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Simple pencil portraits & a blue floral border on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-heartmarked",
    "ბორდოსფერი სადღეგრძელო და გულით მონიშნული კალენდარი თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Burgundy toasts & a heartmarked calendar on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-colorful-company",
    "ფერადი ნახატები და დასამახსოვრებელი თარიღი თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ნახატი · მხიარული · პირადი",
    "Colorful pencil sketches & a date to keep on warm ivory paper.",
    "Drawn · playful · personal",
  ],
  [
    "wedding-linked-steps",
    "ერთად ჩაკიდებული ხელები და ბორდოსფრად დახატული საქორწილო ნაბიჯები.",
    "სპილოსძვლისფერი · კალამი · სადა",
    "Linked hands and wedding steps drawn in simple burgundy ink.",
    "Ivory · ink · understated",
  ],
  [
    "wedding-garden-table",
    "ბაღის ვახშამი თბილ განათებასა და მწვანე ლენტის ჩარჩოში.",
    "სპილოსძვლისფერი · კალამი · სადა",
    "A garden dinner beneath warm lights and a loose green ribbon frame.",
    "Ivory · ink · understated",
  ],
  [
    "wedding-ivory-vows",
    "სპილოსძვლისფერი კაბა და პიჯაკი ნაზ ოქროსფერ საკიდებზე.",
    "აკვარელი · რომანტიკული · პირადი",
    "An ivory gown and dinner jacket on delicate gold hangers, painted with quiet charm.",
    "Watercolor · romantic · personal",
  ],
  [
    "wedding-ribbon-revel",
    "მოცეკვავე სტუმრები ფერად სამოსში, ნაზი ლენტები და ყვავილები.",
    "აკვარელი · რომანტიკული · პირადი",
    "New dancing guests in bright outfits, soft ribbons, and airy flowers.",
    "Watercolor · romantic · personal",
  ],
  [
    "wedding-come-rain-or-shine",
    "მხიარული წყვილი ქოლგის ქვეშ, საერთო მომავლისკენ მიმავალი.",
    "სპილოსძვლისფერი · კალამი · სადა",
    "A playful ink couple sharing an umbrella and the road ahead.",
    "Ivory · ink · understated",
  ],
  [
    "wedding-side-by-side",
    "წყვილის პატარა ნახატი მათი ახალი ცხოვრების დასაწყისში.",
    "სპილოსძვლისფერი · კალამი · სადა",
    "A small expressive drawing of a couple walking into their next chapter.",
    "Ivory · ink · understated",
  ],
  [
    "wedding-rose-letter",
    "მხიარული ვარდისფერი აკვარელი და საქორწილო წერილი თბილ სპილოსძვლისფერ ქაღალდზე.",
    "ვარდისფერი · რომანტიკული · პირადი",
    "A blush watercolor envelope with an ivory wedding note and a delicate seal.",
    "Blush · romantic · personal",
  ],
  [
    "wedding-sage-letter",
    "მხიარული სალბისფერი აკვარელი და საქორწილო წერილი თბილ სპილოსძვლისფერ ქაღალდზე.",
    "სალბისფერი · რომანტიკული · პირადი",
    "A sage watercolor envelope with an ivory wedding note and a delicate seal.",
    "Sage · romantic · personal",
  ],
  [
    "wedding-first-dance",
    "მხიარული მოცეკვავე წყვილი და ლენტის ჩარჩო თბილ სპილოსძვლისფერ ქაღალდზე.",
    "კალამი · მხიარული · მარადიული",
    "A playful dancing couple and a loose ribbon frame on warm ivory paper.",
    "Ink · playful · timeless",
  ],
  [
    "wedding-happily-away",
    "პატარა საქორწილო მანქანა, თავისუფალი ჩარჩო და ახალი ბედნიერი თავი.",
    "კალამი · მხიარული · მარადიული",
    "A little getaway car, a loose ink frame, and a joyful new chapter.",
    "Ink · playful · timeless",
  ],
  [
    "wedding-our-people",
    "კალმით დახატული მეგობრული სტუმრები ჩვენი საერთო დღის გარშემო იკრიბებიან.",
    "ხელით დახატული · მხიარული · პირადი",
    "Friendly pen-drawn wedding guests gather around a day made for all of us.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-date-and-dinner",
    "მარტივი კალენდარი და ლურჯი კალმით დახატული ვახშმის სუფრა.",
    "ხელით დახატული · მხიარული · პირადი",
    "A simple calendar detail above a casually drawn blue-ink dinner setting.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-little-vows",
    "წყვილის პატარა ნახატი, თბილი წითელი ასოები და პირადი საქორწილო წერილი.",
    "ხელით დახატული · მხიარული · პირადი",
    "A small couple sketch, warm red lettering, and a personal wedding note.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-celebration-table",
    "ხელით დახატული საქორწილო სუფრა საყვარელი ადამიანებისთვის.",
    "ხელით დახატული · მხიარული · პირადი",
    "A hand-drawn wedding table with room for all our favorite people.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-day-notes",
    "ფერადი მსუბუქი ნახატები და ქორწილის დღის მარტივი გეგმა.",
    "ხელით დახატული · მხიარული · პირადი",
    "Loose colored doodles and a simple wedding-day plan on warm paper.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-blue-clink",
    "ორი ლურჯი კალმით დახატული ხელი ახალი დასაწყისის სადღეგრძელოს ამბობს.",
    "ხელით დახატული · მხიარული · პირადი",
    "Two simple blue-ink hands raise a glass to a beautiful beginning.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-tipsy-together",
    "მხიარული საქორწილო პერსონაჟები შავი მელნით და ღვინის დიდი რეკვიზიტებით.",
    "ხელით დახატული · მხიარული · პირადი",
    "Quirky black-ink wedding characters with oversized wine props and plenty of joy.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-heart-hideaway",
    "კალმით დახატული წყვილი გულის უკან და მხიარული პირადი განწყობა.",
    "ხელით დახატული · მხიარული · პირადი",
    "A sweet pen-drawn couple hiding behind a heart, with a playful personal touch.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-blue-pour",
    "ლურჯი მელნის მხიარული სადღეგრძელო კრემისფერ ქაღალდზე.",
    "ხელით დახატული · მხიარული · პირადი",
    "A playful cobalt pour on cream paper for a wedding worth raising a glass to.",
    "Hand-drawn · playful · personal",
  ],
  [
    "wedding-garden-dance",
    "აკვარელით მოხატული სტუმრები, ვარდისფერი დისკოს ფარნები და ცეკვით სავსე ქორწილი.",
    "პასტელი · მხიარული · მოხატული",
    "Watercolor party guests, pink disco lanterns, and a wedding made for dancing.",
    "Pastel · joyful · hand-painted",
  ],
  [
    "wedding-ink-and-ivy",
    "ინდიგოს კალმით მოხატული ყვავილები და სიყვარულით დახატული ქორწილის ამბავი.",
    "ინდიგო · მხიარული · ხელით დახატული",
    "Indigo pen illustrations, wandering wildflowers, and a wedding story drawn with love.",
    "Indigo · whimsical · hand-drawn",
  ],
  [
    "birthday-pink-post",
    "ნაზი აკვარელის კონვერტი და დაბადების დღის პირადი წერილი.",
    "ვარდისფერი წერილი",
    "A soft watercolor envelope and a birthday note made just for you.",
    "Blush · simple · personal",
  ],
  [
    "birthday-disco-scrapbook",
    "ფერადი ქაღალდი, კალენდრის ხაზები და ცეკვის მოწვევა.",
    "დისკოს ალბომი",
    "Colorful paper accents, a loose calendar grid, and an invitation to dance.",
    "Cream · colorful · analog",
  ],
  [
    "birthday-velvet-post",
    "ბორდოს ზოლები, ვარდისფერი ქაღალდი და კოქტეილისა და ტორტის ესკიზები.",
    "ბორდოს წერილი",
    "Wine-red stripes, blush paper, and charming cocktail-and-cake sketches.",
    "Wine red · blush · romantic",
  ],
  [
    "birthday-checkerboard-cheers",
    "ნარინჯისფერი კვადრატები, წითელი ტალღები და დაბადების დღის სადღეგრძელო.",
    "კოქტეილების წვეულება",
    "Wavy orange checks, vivid red curves, and a birthday made for a toast.",
    "Orange · bold · retro",
  ],
  [
    "birthday-pastel-disco",
    "ცისფერი ზოლები, მოხატული დისკოს ბურთი და დაბადების დღის ცეკვა.",
    "პასტელის დისკო",
    "Powder-blue stripes, a painted mirror ball, and a dreamy birthday dance.",
    "Powder blue · dreamy · playful",
  ],
  [
    "birthday-paper-garland",
    "აკვარელით ნაზად მოხატული ტორტი, პასტელის გირლანდა და პატარა ვარსკვლავები სუფთა ფონზე.",
    "პასტელი · ნაზი · აკვარელი",
    "A loosely painted birthday cake, pastel bunting, and delicate sparkles on a clean background.",
    "Pastel · airy · watercolor",
  ],
  [
    "birthday-strawberry-social",
    "მოხატული ვარდისფერი ზოლები, მარწყვის ტორტი და ტკბილი დაბადების დღე.",
    "ვარდისფერი · მარწყვი · მოხატული",
    "Painted pink stripes, strawberry shortcake, and a sweet birthday gathering.",
    "Pink · berry sweet · hand-painted",
  ],
  [
    "birthday-cobalt-cheers",
    "ლურჯი პოსტერის ასოები, კოქტეილის ილუსტრაციები და დაბადების დღე მეგობრებთან ერთად.",
    "ლურჯი · გრაფიკული · მეგობრული",
    "Bold blue lettering, illustrated cocktail cheers, and a birthday with good company.",
    "Cobalt · graphic · convivial",
  ],
  [
    "birthday-ribbon-social",
    "ბორდოს ლენტების ესკიზები, კოქტეილები და მხიარული დაბადების დღე კრემისფერ ქაღალდზე.",
    "ბორდო · მხიარული · რომანტიკული",
    "Wine-red ribbon sketches, cocktail doodles, and a playful birthday on cream paper.",
    "Burgundy · playful · romantic",
  ],
  [
    "birthday-football-club",
    "დაბადების დღის საფეხბურთო წვეულება, რეტრო ილუსტრაციები და საყვარელი თანაგუნდელები.",
    "მწვანე · სპორტული · რეტრო",
    "A match-day birthday with vintage football artwork and all your favorite teammates.",
    "Forest green · sporty · vintage",
  ],
  [
    "birthday-ballerina",
    "ვარდისფერი საბალეტო ფეხსაცმელი, ჰაეროვანი ტიული და ცეკვით სავსე დაბადების დღე.",
    "ვარდისფერი · ნაზი · მეოცნებე",
    "Blush ballet slippers, airy tulle, and a birthday made for dancing.",
    "Blush · graceful · dreamy",
  ],
  [
    "birthday-khinkali-beer",
    "ხინკალი, ოქროსფერი ლუდი და დაბადების დღის თბილი სუფრა საყვარელ ადამიანებთან.",
    "ბორდოსფერი · ოქროსფერი · მეგობრული",
    "Khinkali, golden beer, and a warm birthday table with your favorite people.",
    "Burgundy · golden · convivial",
  ],
  [
    "birthday-space-explorer",
    "მოხატული რაკეტები, პლანეტები და დაბადების დღის თავგადასავალი ვარსკვლავებში.",
    "ღამის ცა · კოსმოსი · ოცნებები",
    "Painted rockets, orbiting planets, and a birthday adventure among the stars.",
    "Midnight · cosmic · imaginative",
  ],
  [
    "birthday-dino-adventure",
    "მეგობრული დინოზავრები, ჯუნგლების ფოთლები და აღმოჩენებით სავსე დაბადების დღე.",
    "მწვანე · მოხატული · თავგადასავალი",
    "Friendly dinosaurs, a leafy jungle canopy, and a birthday full of discovery.",
    "Sage · painted · adventurous",
  ],
  [
    "birthday-race-day",
    "რეტრო სარბოლო მანქანები, ჭადრაკული დროშები და დაბადების დღე პატარა ჩემპიონებისთვის.",
    "წითელი · მხიარული · თავგადასავალი",
    "Vintage race cars, checkered flags, and a birthday built for little champions.",
    "Red · playful · adventurous",
  ],
  [
    "birthday-supper-club",
    "სანთლის შუქი, ბორდოსფერი ხავერდი და დაბადების დღის ვახშამი საყვარელ ადამიანებთან.",
    "ბორდოსფერი · სანთლის შუქი · მყუდრო",
    "Candlelight, burgundy velvet, and an intimate birthday dinner with your favorite people.",
    "Burgundy · candlelit · intimate",
  ],
  [
    "birthday-modern-toast",
    "ვერცხლის დეტალები, თბილი სპილოსძვლისფერი და დახვეწილი დაბადების დღის საღამო.",
    "ვერცხლი · თანამედროვე · დახვეწილი",
    "Sculptural silver, warm ivory, and a beautifully understated birthday celebration.",
    "Silver · modern · refined",
  ],
  [
    "birthday-classic-celebration",
    "ტორტი, სანთლები და საყვარელი ადამიანები — დაბადების დღე, რომელიც ყოველთვის კარგია.",
    "თბილი · მხიარული · კლასიკური",
    "Cake, candles, and everyone you love in a timeless birthday setting.",
    "Warm · joyful · timeless",
  ],
  [
    "birthday-floral-affair",
    "ვარდისფერი შროშანები, თბილი სპილოსძვლისფერი და ლამაზი შეკრება დაბადების დღისთვის.",
    "ყვავილოვანი · დახვეწილი · საზეიმო",
    "Lush pink lilies, warm ivory, and a birthday made for a beautiful gathering.",
    "Floral · refined · celebratory",
  ],
  [
    "birthday-retro-disco",
    "დისკოს ბურთები, თბილი ფერები და საცეკვაო განწყობა.",
    "მხიარული · თბილი · ენერგიული",
    "Mirrorball nights, warm color, and a little dance-floor drama.",
    "Funky · warm · electric",
  ],
  [
    "birthday-y2k-digital",
    "მბზინავი ფანჯრები და პიქსელური ვარსკვლავები ახალი ნოსტალგიისთვის.",
    "ქრომი · ციფრული · მხიარული",
    "Glossy windows and pixel stars for a new kind of nostalgia.",
    "Chrome · digital · playful",
  ],
  [
    "birthday-pink-glam",
    "მბზინავი და თავდაჯერებული დაბადების დღე მოდური ხასიათით.",
    "მბზინავი · მკვეთრი · მოდური",
    "A fashion-forward birthday with sparkle and confidence.",
    "Glossy · bold · fashion",
  ],
  [
    "birthday-coquette",
    "ნაზი ლენტები, დახვეწილი შრიფტი და ოცნებასავით დღესასწაული.",
    "ვარდისფერი · ნაზი · რომანტიკული",
    "Soft ribbons, delicate type, and a dreamy little celebration.",
    "Blush · delicate · romantic",
  ],
  [
    "birthday-garden-party",
    "ღია ცის განწყობა სიმწვანითა და ნაზი დღის შუქით.",
    "ბოტანიკური · ცოცხალი · დახვეწილი",
    "An open-air feeling with greenery and soft daylight.",
    "Botanical · fresh · graceful",
  ],
  [
    "birthday-pastel-dream",
    "ღრუბელივით რბილი ფერები და სიხარულით სავსე ფორმები.",
    "ჰაეროვანი · ტკბილი · ფერადი",
    "Cloud-soft color and rounded shapes full of joy.",
    "Airy · sweet · colorful",
  ],
  [
    "birthday-tropical-summer",
    "ციტრუსის ენერგია, აუზის ლურჯი და მთელი დღის მზე.",
    "ზაფხული · ციტრუსი · ცოცხალი",
    "Citrus energy, pool-blue color, and sunshine all day.",
    "Summer · citrus · lively",
  ],
  [
    "birthday-painted-summer",
    "ზღვისპირა დღესასწაული აკვარელის, მზით გამთბარი ქაღალდისა და ნაზი ფერების ფონზე.",
    "ზღვისპირა · მოხატული · ჰაეროვანი",
    "A breezy seaside celebration in watercolor, sun-warmed paper, and soft coastal color.",
    "Coastal · painted · airy",
  ],
  [
    "birthday-beer-party",
    "მყუდრო საღამო ბარში, კარგი ლუდითა და კიდევ უკეთესი მეგობრებით.",
    "ქარვისფერი · თავისუფალი · საღამოს",
    "A warm night at the bar with good beer and even better company.",
    "Amber · relaxed · after dark",
  ],
  [
    "wedding-timeless-white",
    "სპილოსძვლისფერი სიმშვიდე და ადგილი ყოველი ძვირფასი დეტალისთვის.",
    "კლასიკური · ნათელი · დახვეწილი",
    "Quiet ivory elegance with room for every precious detail.",
    "Classic · light · graceful",
  ],
  [
    "wedding-modern-editorial",
    "თანამედროვე სიყვარულის ისტორია შავისა და თეთრის მკვეთრ კონტრასტში.",
    "გრაფიკული · დახვეწილი · თანამედროვე",
    "A contemporary love story told in bold black and white.",
    "Graphic · refined · current",
  ],
  [
    "wedding-romantic-garden",
    "ნაზი ყვავილები და მწვანე ბილიკები აყვავებული დღესასწაულისთვის.",
    "ყვავილოვანი · ნაზი · ჰაეროვანი",
    "Soft florals and green paths for a celebration in bloom.",
    "Floral · tender · airy",
  ],
  [
    "wedding-black-tie",
    "საზეიმო საღამო სანთლების შუქითა და ოქროს ელფერით.",
    "საზეიმო · შთამბეჭდავი · ნათელი",
    "Formal evenings, candlelight, and a hint of gold.",
    "Formal · dramatic · luminous",
  ],
  [
    "wedding-tuscany",
    "ტერაკოტის სითბო და ხმელთაშუა ზღვის მშვიდი განწყობა.",
    "თბილი · ბუნებრივი · ელეგანტური",
    "Terracotta warmth and an unhurried Mediterranean mood.",
    "Warm · rustic · elegant",
  ],
  [
    "wedding-coastal",
    "ზღვის ჰაერი, რბილი ქვიშა და შუქი, რომელიც თითქოს არ ქრება.",
    "ჰაეროვანი · ნაზი · მშვიდი",
    "Sea air, soft sand, and light that seems to last forever.",
    "Breezy · pale · serene",
  ],
  [
    "wedding-bohemian",
    "ბუნებრივი ტექსტურა და თავისუფალი, გულწრფელი სტილი.",
    "ბუნებრივი · თავისუფალი · თბილი",
    "Earthy texture and effortless, heartfelt style.",
    "Organic · relaxed · warm",
  ],
  [
    "wedding-vintage-romance",
    "ძველი ქაღალდის ხიბლი და ზღაპრული დღესასწაულის განცდა.",
    "ნოსტალგიური · ორნამენტული · მყუდრო",
    "Antique-paper charm with a storybook sense of occasion.",
    "Nostalgic · ornate · intimate",
  ],
  [
    "wedding-celestial",
    "ვერცხლისფერი თანავარსკვლავედები და ორი ადამიანისთვის შექმნილი ღამის ცა.",
    "ოცნებისეული · ღამის · მანათობელი",
    "Silver constellations and a night sky made for two.",
    "Dreamlike · midnight · glowing",
  ],
  [
    "wedding-modern-botanical",
    "სუფთა ხაზები, ღრმა მწვანე და გამოკვეთილი ფოთლები.",
    "ბუნებრივი · მინიმალური · ცოცხალი",
    "Clean lines meet deep green and sculptural leaves.",
    "Natural · minimal · fresh",
  ],
];

function themeCaptions(language) {
  const offset = languages.indexOf(language) * 2 + 1;
  return Object.fromEntries([
    ...themeCatalog.flatMap(([id, ...values]) => [
      [`themes.${id}.name`, values[offset - 1]],
      [`themes.${id}.style`, values[offset]],
    ]),
    ...themeDescriptions.flatMap(([id, ...values]) => [
      [`themes.${id}.description`, values[offset - 1]],
      [`themes.${id}.mood`, values[offset]],
    ]),
  ]);
}

export const captions = {
  ka: {
    "modernToast.celebration": "დაბადების დღის საღამო",
    "photoCard.celebrate": "ერთად ვიზეიმოთ!",
    "photoCard.turns": "წლის ხდება",
    "khinkali.paletteTitle": "ხუთი ფერი. ერთი განწყობა.",
    "khinkali.note": "გემრიელი სუფრა.\nსაუკეთესო კომპანია.",
    "khinkali.caption": "ხინკალი\nლუდი\nმეგობრები\nკარგი დრო",
    "modernToast.turns": "{age} წლის ხდება",
    ...themeCaptions("ka"),
    "nav.home": "მთავარი",
    "nav.surprises": "სიურპრიზები",
    "nav.invitations": "მოსაწვევები",
    "nav.about": "ჩვენ შესახებ",
    "nav.contact": "კონტაქტი",
    "nav.main": "მთავარი მენიუ",
    "nav.brand": "11:11 მთავარი გვერდი",
    "nav.language": "ენა",
    "common.home": "მთავარი",
    "common.backHome": "მთავარზე",
    "common.allEvents": "ყველა ღონისძიება",
    "common.exploreEvents": "ღონისძიებების ნახვა",
    "common.exploreDesign": "დიზაინის ნახვა",
    "common.exploreInvitations": "მოსაწვევების ნახვა",
    "common.preview": "წინასწარი ნახვა",
    "common.birthday": "დაბადების დღე",
    "common.wedding": "ქორწილი",
    "common.corporate": "კორპორატიული",
    "common.other": "სხვა ზეიმები",
    "common.eventCategory": "კატეგორია",
    "common.design": "დიზაინი",
    "common.designs": "დიზაინი",
    "common.invitation": "მოსაწვევი",
    "common.invitations": "მოსაწვევები",
    "common.style": "სტილი",
    "common.theme": "თემა",
    "common.themes": "თემები",
    "home.hero.message": "შექმენი დაუვიწყარი მომენტები.",
    "home.hero.action": "დაიწყე ამბავი++",
    "home.projects.title": "აირჩიე შენი მომენტი",
    "home.projects.description":
      "აირჩიე ღონისძიება, აღმოაჩინე დიზაინი და გააცოცხლე ის ადამიანებითა და დეტალებით.",
    "home.projects.index": "01 / ღონისძიებები",
    "home.possibilities.index": "02 / შესაძლებლობები",
    "home.possibilities.title": "რას შექმნი?",
    "home.possibilities.description":
      "დაიწყე მოსაწვევით. დაამატე ისტორიები, ღიმილი და ადამიანები, რომლებიც ამ დღეს შენად აქცევენ.",
    "home.invitations.index": "04 / მოსაწვევები",
    "home.invitations.title": "შექმენი შთაბეჭდილება.",
    "home.invitations.description":
      "შენი განწყობა, შენი დიზაინი.",
    "home.interactive.index": "05 / მეტი ამბავი",
    "home.interactive.title": "ერთად ვქმნით ამბავს.",
    "home.interactive.description":
      "11:11 მოსაწვევზე მეტია — იდეები, რომლებიც შენს ადამიანებს აახლოებს.",
    "home.final.title": "გახადე დაუვიწყარი.",
    "home.final.description": "რაც უნდა იყოს მიზეზი, ეს დღე შენებური გახადე.",
    "about.title": "11:11-ის შესახებ",
    "about.description":
      "11:11 — სივრცე შენი ადამიანებისა და დაუვიწყარი მომენტებისთვის.",
    "contact.title": "დაგვიკავშირდი",
    "contact.description":
      "გვერდს ვამზადებთ. მალე დაგვიკავშირდები.",
    "notFound.title": "გვერდი ვერ მოიძებნა",
    "notFound.description": "ეს გვერდი ჯერ არ არსებობს.",
    "project.notFound.title": "ღონისძიება ვერ მოიძებნა",
    "project.notFound.description":
      "ღონისძიება ვერ მოიძებნა. აღმოაჩინე სხვა იდეები.",
    "project.comingSoon": "მალე დაემატება.",
    "project.exploreCategory": "კატეგორიის ნახვა",
    "project.birthday.description":
      "იზეიმე მისი ისტორია, საყვარელი ადამიანები და კიდევ ერთი წელი.",
    "project.wedding.description":
      "ციფრული სივრცე შენი დღისა და საერთო ამბებისთვის.",
    "project.corporate.description":
      "დაუვიწყარი შეხვედრები, პრეზენტაციები და ვახშმები.",
    "project.other.description":
      "სივრცე შენი იდეებისა და მნიშვნელოვანი მომენტებისთვის.",
    "project.genderReveal": "ბავშვის სქესის გაგება",
    "project.genderReveal.description":
      "მხიარული სიურპრიზი თანამედროვე სტილით.",
    "project.bachelorette": "ბაჩელორეტი",
    "project.bachelorette.description":
      "სტილური საღამო საყვარელ ადამიანებთან ერთად.",
    "project.christening": "ნათლობა",
    "project.christening.description": "მშვიდი დღესასწაული ძვირფასი დღისთვის.",
    "home.possibility.invitations.title": "ციფრული მოსაწვევები",
    "home.possibility.invitations.detail":
      "შექმენი ზეიმის განწყობა.",
    "home.possibility.birthday.title": "დაბადების დღის ამბავი",
    "home.possibility.birthday.detail":
      "იზეიმე მისი ამბავი.",
    "home.possibility.wedding.title": "ქორწილის გვერდები",
    "home.possibility.wedding.detail":
      "შენი ადამიანები და გეგმები.",
    "home.possibility.diary.title": "მეგობრობის დღიური",
    "home.possibility.diary.detail":
      "შეინახე მეგობრების ამბები.",
    "home.possibility.memories.title": "სტუმრების მოგონებები",
    "home.possibility.memories.detail":
      "შეინახე სიტყვები და მომენტები.",
    "home.possibility.games.title": "თამაშები და ქვიზები",
    "home.possibility.games.detail": "ყველა ჩართე მხიარულებაში.",
    "home.interactive.diary.description":
      "მეგობრობის ამბები მათი თვალით.",
    "home.interactive.wishes.title": "მილოცვები",
    "home.interactive.wishes.description":
      "თბილი სიტყვები დიდხანს გასახსენებლად.",
    "home.interactive.memories.title": "მოგონებები",
    "home.interactive.memories.description":
      "აქციე ამბები მოგონებებად.",
    "invitations.eyebrow": "დიზაინების კოლექცია / 11:11",
    "invitations.title": "მოსაწვევი სამახსოვროდ.",
    "invitations.description":
      "შეურჩიე შენს ზეიმს მოსაწვევი. აღმოაჩინე {count} დიზაინი.",
    "invitations.filter": "მოსაწვევების გაფილტვრა",
    "invitations.styleFilter": "სტილის ფილტრი",
    "invitations.all": "ყველა",
    "invitations.allStyles": "ყველა სტილი",
    "invitations.collection": "კოლექცია",
    "invitations.birthday.title": "დაბადების დღის მოსაწვევები",
    "invitations.birthday.description":
      "კიდევ ერთი წელი საყვარელ ადამიანებთან.",
    "invitations.wedding.title": "ქორწილის მოსაწვევები",
    "invitations.wedding.description":
      "პირველი შთაბეჭდილება დაუვიწყარი დღისთვის.",
    "invitations.empty.title": "ამ სტილის დიზაინი ჯერ არ გვაქვს.",
    "invitations.empty.description":
      "სცადე სხვა სტილი ან ნახე კოლექცია.",
    "invitations.viewAllStyles": "ყველა სტილი",
    "invitations.note":
      "ეს დიზაინის წინასწარი ნიმუშებია. სრულფასოვანი მოსაწვევები ღონისძიების შექმნისას იქნება ხელმისაწვდომი.",
    "invitations.notFound.title": "მოსაწვევი ვერ მოიძებნა",
    "invitations.notFound.description":
      "ნახე დიზაინები და აირჩიე შენი ზეიმისთვის.",
    "invitations.allInvitations": "ყველა მოსაწვევი",
    "invitations.sample": "მოსაწვევის ნიმუში",
    "invitations.showcase": "დიზაინის ჩვენება",
    "invitations.explainer":
      "გაიცანი დიზაინი: შრიფტი, ფერები და ზეიმის დეტალები.",
    "invitations.colors": "თემის ფერები",
    "invitations.end.label": "აირჩიე მოსაწვევი",
    "invitations.end.title": "აღმოაჩინე მთელი კოლექცია.",
    "invitations.end.action": "ყველა მოსაწვევი",
    "invitations.invited": "მოწვეული ხარ",
    "invitations.invites": "11:11 მოსაწვევები",
    "invitations.styles.cartoon": "ილუსტრაციული",
    "invitations.styles.dark": "მუქი",
    "invitations.styles.floral": "ყვავილები",
    "invitations.styles.green": "მწვანე",
    "invitations.styles.light-neutral": "ღია ნეიტრალური",
    "invitations.styles.line-art": "ხაზოვანი გრაფიკა",
    "invitations.styles.metallic": "მეტალის ბზინვა",
    "invitations.styles.pastel": "პასტელი",
    "invitations.styles.photographic": "ფოტო",
    "invitations.styles.earthy": "მიწის ტონები",
    "invitations.styles.brown": "ყავისფერი",
    "invitations.styles.animated": "ანიმაციური",
    "invitations.styles.retro": "რეტრო",
    "invitations.styles.coastal": "ზღვისპირა",
    "invitations.styles.neon": "ნეონი",
    "birthday.hero.label": "დაბადების დღე / 11:11",
    "birthday.hero.title": "კიდევ ერთი წელი",
    "birthday.hero.emphasis": "გახადე დაუვიწყარი.",
    "birthday.hero.description":
      "მოსაწვევები, თბილი სიტყვები და ამბები — ყველაფერი მის გასახარებლად.",
    "birthday.exploreInvitations": "აირჩიე მოსაწვევი",
    "birthday.art": "კიდევ ერთი წრე მზის გარშემო",
    "birthday.invitations.description":
      "ზეიმი მოსაწვევით იწყება.",
    "birthday.modules.label": "შენი ზეიმი, შენი არჩევანი",
    "birthday.modules.title": "დაამატე ის, რაც შენ გგავს",
    "birthday.modules.description":
      "მოსაწვევი, გვერდი, უკუთვლა და გალერეა. დაამატე დღიური, წერილები, თამაშები ან ქვიზი.",
    "birthday.modules.caption":
      "ერთი დღიური, დაბადების დღის ორი დიზაინი.",
    "birthday.modules.link": "სცადე მოდული",
    "birthday.wishes.label": "თბილი სიტყვები",
    "birthday.wishes.title": "მილოცვები",
    "birthday.wishes.description":
      "პატარა წერილი, დიდი მოგონება.",
    "birthday.stories.label": "შეინახე ისტორიები",
    "birthday.stories.title": "თარიღზე მეტი",
    "birthday.stories.description":
      "ჰკითხე მეგობრებს და ნახე ზეიმი მათი თვალით.",
    "birthday.gallery.label": "ფოტომოგონებები",
    "birthday.gallery.title": "შენი ადამიანების ფოტოები",
    "birthday.gallery.description":
      "ღიმილი, მხიარულება და საყვარელი კადრები.",
    "birthday.games.label": "მალე",
    "birthday.games.title": "მხიარულება გრძელდება",
    "birthday.games.description":
      "თამაშები ყველას გასართობად.",
    "birthday.cta.title": "ვიზეიმოთ?",
    "birthday.cta.text": "დაიწყე დაუვიწყარი მოსაწვევით.",
    "birthday.gallery.goodTimes": "კარგი დრო",
    "birthday.gallery.ourPeople": "ჩვენი მეგობრები",
    "birthday.gallery.aria":
      "მომავალი ფოტომოგონებების გალერეის დეკორატიული ნიმუში",
    "wedding.hero.label": "ქორწილი / 11:11",
    "wedding.hero.line1": "ერთი დღე.",
    "wedding.hero.line2": "ერთი ისტორია.",
    "wedding.hero.emphasis": "შენი.",
    "wedding.hero.description":
      "შენი ადამიანები, დაპირებები და დეტალები — შენი დღის ამბავი.",
    "wedding.exploreInvitations": "აირჩიე მოსაწვევი",
    "wedding.art": "ერთი მშვენიერი დღე",
    "wedding.invitations.description": "შენი დღის პირველი თავი.",
    "wedding.features.label": "სრული ისტორია",
    "wedding.features.title": "მოსაწვევზე მეტი",
    "wedding.features.description":
      "დეტალები, რომლებიც ყველას აერთიანებს.",
    "wedding.messages.label": "შესანახი სიტყვები",
    "wedding.messages.title": "თბილი სიტყვების წიგნი",
    "wedding.messages.description":
      "წერილები მათგან, ვინც შენს ამბავს იცნობს.",
    "wedding.cta.title": "ამბავი იწყება.",
    "wedding.cta.text": "აირჩიე შენი დღის მოსაწვევი.",
    "experience.firstHello": "პირველი მისალმება",
    "experience.exploreAll.birthday": "დაბადების დღის ყველა მოსაწვევი",
    "experience.exploreAll.wedding": "ქორწილის ყველა მოსაწვევი",
  },
  en: {
    "modernToast.celebration": "Birthday celebration",
    "photoCard.celebrate": "Let’s celebrate!",
    "photoCard.turns": "turns",
    "khinkali.paletteTitle": "Five colors. One feeling.",
    "khinkali.note": "Good food\nBetter company",
    "khinkali.caption": "KHINKALI\nBEER\nFRIENDS\nGOOD TIMES",
    "modernToast.turns": "turns {age}",
    ...themeCaptions("en"),
    "nav.home": "Home",
    "nav.surprises": "Surprises",
    "nav.invitations": "Invitations",
    "nav.about": "About Us",
    "nav.contact": "Contact Us",
    "nav.main": "Main navigation",
    "nav.brand": "11:11 home",
    "nav.language": "Language",
    "common.home": "Home",
    "common.backHome": "Back to home",
    "common.allEvents": "All event types",
    "common.exploreEvents": "Explore event types",
    "common.exploreDesign": "Explore design",
    "common.exploreInvitations": "Explore invitations",
    "common.preview": "Preview",
    "common.birthday": "Birthday",
    "common.wedding": "Wedding",
    "common.corporate": "Corporate",
    "common.other": "Other Celebrations",
    "common.eventCategory": "Event category",
    "common.design": "design",
    "common.designs": "designs",
    "common.invitation": "invitation",
    "common.invitations": "invitations",
    "common.style": "Style",
    "common.theme": "Theme",
    "common.themes": "themes",
    "home.hero.message": "Make moments worth remembering.",
    "home.hero.action": "Make it count++",
    "home.projects.title": "Choose your moment",
    "home.projects.description":
      "Choose an event, discover a design, and make room for the people and details that bring it to life.",
    "home.projects.index": "01 / EVENT TYPES",
    "home.possibilities.index": "02 / POSSIBILITIES",
    "home.possibilities.title": "What can you create?",
    "home.possibilities.description":
      "Start with an invitation. Add the stories, smiles, and people that make it yours.",
    "home.invitations.index": "04 / INVITATIONS",
    "home.invitations.title": "Make a first impression.",
    "home.invitations.description":
      "Different designs for different kinds of magic.",
    "home.interactive.index": "05 / THE GOOD STUFF",
    "home.interactive.title": "Everyone becomes part of the story.",
    "home.interactive.description":
      "11:11 goes beyond the invite with ideas that bring your people closer.",
    "home.final.title": "Make your moment count.",
    "home.final.description": "Whatever the reason, make it feel like yours.",
    "about.title": "About 11:11",
    "about.description":
      "11:11 is a space for the moments, people, and celebrations you want to remember.",
    "contact.title": "Contact Us",
    "contact.description":
      "We’re getting this space ready. Come back soon to get in touch.",
    "notFound.title": "Page not found",
    "notFound.description": "That page isn’t here yet.",
    "project.notFound.title": "Experience not found",
    "project.notFound.description":
      "That experience isn’t here, but there is more to explore.",
    "project.comingSoon": "This experience is coming soon.",
    "project.exploreCategory": "Explore category",
    "project.birthday.description":
      "Celebrate their story, their people, and another trip around the sun.",
    "project.wedding.description":
      "A beautiful digital home for one day and a lifetime of stories.",
    "project.corporate.description":
      "Make team gatherings, launches, and private dinners memorable.",
    "project.other.description":
      "Make room for every meaningful milestone and all your own ideas.",
    "project.genderReveal": "Gender Reveal",
    "project.genderReveal.description":
      "A joyful surprise with a modern, playful feel.",
    "project.bachelorette": "Bachelorette Party",
    "project.bachelorette.description":
      "A stylish night for your favorite people.",
    "project.christening": "Christening",
    "project.christening.description":
      "A peaceful celebration for a cherished day.",
    "home.possibility.invitations.title": "Digital invitations",
    "home.possibility.invitations.detail":
      "Set the feeling before the day begins.",
    "home.possibility.birthday.title": "Birthday experiences",
    "home.possibility.birthday.detail":
      "Celebrate their story, not just the date.",
    "home.possibility.wedding.title": "Wedding pages",
    "home.possibility.wedding.detail":
      "A place for your people and your plans.",
    "home.possibility.diary.title": "Friendship Diary module",
    "home.possibility.diary.detail": "Keep the stories your friends tell.",
    "home.possibility.memories.title": "Guest memories",
    "home.possibility.memories.detail":
      "Collect words and moments worth saving.",
    "home.possibility.games.title": "Games & quizzes",
    "home.possibility.games.detail": "Bring everyone into the fun.",
    "home.interactive.diary.description":
      "See a friendship through the eyes of the people in it.",
    "home.interactive.wishes.title": "Birthday Wishes",
    "home.interactive.wishes.description":
      "Make a collection of kind words they can return to.",
    "home.interactive.memories.title": "Memories",
    "home.interactive.memories.description":
      "Turn little stories into something that lasts.",
    "invitations.eyebrow": "THE DESIGN COLLECTION / 11:11",
    "invitations.title": "An invitation they’ll want to keep.",
    "invitations.description":
      "Find a first hello that feels like your celebration. Explore {count} looks, each with its own point of view.",
    "invitations.filter": "Filter invitation templates",
    "invitations.styleFilter": "Filter by style",
    "invitations.all": "All",
    "invitations.allStyles": "All styles",
    "invitations.collection": "THE COLLECTION",
    "invitations.birthday.title": "Birthday invitations",
    "invitations.birthday.description":
      "For another year of stories, late nights, and all your favorite people.",
    "invitations.wedding.title": "Wedding invitations",
    "invitations.wedding.description":
      "A beautiful first glimpse of the day you’ll always remember.",
    "invitations.empty.title": "No designs match this style yet.",
    "invitations.empty.description":
      "Try another style, or browse the full collection.",
    "invitations.viewAllStyles": "View all styles",
    "invitations.note":
      "These are design previews. Full invitations will be part of the event creation experience.",
    "invitations.notFound.title": "Invitation not found",
    "invitations.notFound.description":
      "Explore the current designs and find one that feels like your celebration.",
    "invitations.allInvitations": "All invitations",
    "invitations.sample": "THE INVITATION SAMPLE",
    "invitations.showcase": "DESIGN SHOWCASE",
    "invitations.explainer":
      "A first look at the visual world of this design. Explore its type, colors, details, and event pieces below.",
    "invitations.colors": "Theme colors",
    "invitations.end.label": "FIND YOUR FIRST HELLO",
    "invitations.end.title": "Explore the full collection.",
    "invitations.end.action": "All invitation designs",
    "invitations.invited": "YOU’RE INVITED",
    "invitations.invites": "11:11 INVITES",
    "invitations.styles.cartoon": "Cartoonish",
    "invitations.styles.dark": "Dark",
    "invitations.styles.floral": "Floral",
    "invitations.styles.green": "Green",
    "invitations.styles.light-neutral": "Light neutrals",
    "invitations.styles.line-art": "Line art & graphics",
    "invitations.styles.metallic": "Metallic luxe",
    "invitations.styles.pastel": "Pastels",
    "invitations.styles.photographic": "Photographic",
    "invitations.styles.earthy": "Warm earth tones",
    "invitations.styles.brown": "Brown tones",
    "invitations.styles.animated": "Animated",
    "invitations.styles.retro": "Retro",
    "invitations.styles.coastal": "Coastal",
    "invitations.styles.neon": "Neon",
    "birthday.hero.label": "BIRTHDAY / 11:11",
    "birthday.hero.title": "Make another year",
    "birthday.hero.emphasis": "unforgettable.",
    "birthday.hero.description":
      "Thoughtful invitations, heartfelt words, and the little stories that make someone feel celebrated.",
    "birthday.exploreInvitations": "Explore birthday invitations",
    "birthday.art": "another trip around the sun",
    "birthday.invitations.description":
      "A first glimpse of the celebration, designed to make people smile before the day even begins.",
    "birthday.modules.label": "YOUR PEOPLE, YOUR WAY",
    "birthday.modules.title": "Add the parts that feel like you",
    "birthday.modules.description":
      "Invitation, event page, countdown, and gallery set the scene. Turn on a diary, messages, games, or a quiz when they fit your celebration.",
    "birthday.modules.caption":
      "The same Friendship Diary in two Birthday designs.",
    "birthday.modules.link": "See how the module works",
    "birthday.wishes.label": "KIND WORDS",
    "birthday.wishes.title": "Birthday wishes",
    "birthday.wishes.description":
      "A little message can become a memory you keep forever.",
    "birthday.stories.label": "KEEP THE STORIES",
    "birthday.stories.title": "More than a date on the calendar",
    "birthday.stories.description":
      "Give friends a few prompts and see the celebration through their eyes.",
    "birthday.gallery.label": "PHOTO MEMORIES",
    "birthday.gallery.title": "A gallery of all your people",
    "birthday.gallery.description":
      "The candid moments, the joyful chaos, the photos you come back to.",
    "birthday.games.label": "COMING LATER",
    "birthday.games.title": "The fun keeps going",
    "birthday.games.description":
      "Little games to bring everyone into the story.",
    "birthday.cta.title": "Ready to celebrate?",
    "birthday.cta.text": "Start with an invitation they’ll remember.",
    "birthday.gallery.goodTimes": "good times",
    "birthday.gallery.ourPeople": "our favorite people",
    "birthday.gallery.aria":
      "Decorative preview of a future photo memories gallery",
    "wedding.hero.label": "WEDDING / 11:11",
    "wedding.hero.line1": "One day.",
    "wedding.hero.line2": "One story.",
    "wedding.hero.emphasis": "Yours.",
    "wedding.hero.description":
      "A space for the people, promises, and beautiful details that make the day your own.",
    "wedding.exploreInvitations": "Explore wedding invitations",
    "wedding.art": "one beautiful day",
    "wedding.invitations.description":
      "A thoughtful first chapter for the celebration to come.",
    "wedding.features.label": "THE WHOLE STORY",
    "wedding.features.title": "More than an invitation",
    "wedding.features.description":
      "The little details that help everyone feel part of your day.",
    "wedding.messages.label": "WORDS TO KEEP",
    "wedding.messages.title": "A guest book full of love",
    "wedding.messages.description":
      "Messages from the people who know your story best.",
    "wedding.cta.title": "Let the story begin.",
    "wedding.cta.text": "Find the invitation that feels like your day.",
    "experience.firstHello": "THE FIRST HELLO",
    "experience.exploreAll.birthday": "Explore all birthday invitations",
    "experience.exploreAll.wedding": "Explore all wedding invitations",
  },
};

Object.assign(captions.ka, {
  "nav.menu": "მენიუ",
  "nav.openMenu": "მენიუს გახსნა",
  "nav.closeMenu": "მენიუს დახურვა",
  "appearance.label": "გარეგნობა",
  "appearance.choice.dark": "მუქი",
  "appearance.choice.light": "ღია",
  "home.carousel.controls": "ნახე მოსაწვევები",
  "home.carousel.previous": "წინა მოსაწვევი",
  "home.carousel.next": "შემდეგი მოსაწვევი",
  "home.carousel.position": "{current} / {total}",
  "themeCanvas.aria": "{name} მოსაწვევის დიზაინი",
  "themeCanvas.birthdayInvite": "დაბადების დღის მოსაწვევი",
  "themeCanvas.weddingInvite": "ქორწილის მოსაწვევი",
  "themeCanvas.gallery.label": "03 / მომენტები",
  "themeCanvas.gallery.birthday.0": "საცეკვაო მოედანი",
  "themeCanvas.gallery.birthday.1": "ჩაიფიქრე სურვილი",
  "themeCanvas.gallery.birthday.2": "ჩვენი ადამიანები",
  "themeCanvas.gallery.birthday.3": "კიდევ ერთი გაუმარჯოს",
  "themeCanvas.gallery.wedding.0": "ერთად",
  "themeCanvas.gallery.wedding.1": "სუფრა",
  "themeCanvas.gallery.wedding.2": "დაპირება",
  "themeCanvas.gallery.wedding.3": "დღესასწაული",
  "themeCanvas.nav": "ღონისძიების ნიმუშის სექციები",
  "themeCanvas.nav.invitation": "მოსაწვევი",
  "themeCanvas.nav.details": "დეტალები",
  "themeCanvas.nav.moments": "მომენტები",
  "themeCanvas.nav.rsvp": "პასუხი",
  "themeCanvas.open": "გახსენი მოსაწვევი",
  "themeCanvas.scroll": "გადაახვიე",
  "themeCanvas.story": "01 / ისტორია",
  "themeCanvas.invitation.label": "02 / მოსაწვევი",
  "themeCanvas.invitation.title": "შენი დღის პირველი მისალმება.",
  "themeCanvas.invitation.description":
    "ასე მოდის დღესასწაული: დღის პატარა ნაწილი, სანამ ის დაიწყება.",
  "themeCanvas.celebration": "დღესასწაული",
  "themeCanvas.celebrateBirthday": "მოდი, ერთად ვიზეიმოთ.",
  "themeCanvas.celebrateWedding": "შემოგვიერთდი ამ დღეს.",
  "themeCanvas.when": "როდის",
  "themeCanvas.at": "{time}-ზე",
  "themeCanvas.where": "სად",
  "themeCanvas.birthdayShoes": "ჩაიცვი საცეკვაო ფეხსაცმელი",
  "themeCanvas.weddingSeeYou": "მოუთმენლად გელით",
  "themeCanvas.countdown": "უკუთვლა",
  "themeCanvas.days": "{count} დღე",
  "themeCanvas.until": "დღესასწაულამდე",
  "themeCanvas.community": "04 / შენი ადამიანები",
  "themeCanvas.rsvp": "05 / ადგილი დაიკავე",
  "themeCanvas.reply": "შენი პასუხის ნახვა",
  "themeCanvas.replied": "პასუხი ნაჩვენებია",
  "themeCanvas.replyNote":
    "რეალურ ღონისძიებაზე ეს პასუხი მასპინძელს გაეგზავნებოდა.",
  "themeCanvas.previewNote": "ინტერაქტიული მაგალითი · პასუხი არ ინახება",
  "themeCanvas.cardAria": "{name} თემის წინასწარი ნახვა",
  "template.its": "ეს არის",
  "template.birthday": "დაბადების დღე!",
  "template.turning": "უსრულდება {age}",
  "template.date": "თარიღი",
  "template.time": "დრო",
  "template.place": "ადგილი",
  "template.at": "{time}-ზე",
  "template.together": "ახალი თავი ერთად",
  "modulePreview.label": "არჩევითი მოდული",
  "modulePreview.guest": "— სტუმარი {name}-ის ღონისძიებაზე",
  "themePreview.notFound.title": "თემა ვერ მოიძებნა",
  "themePreview.notFound.description": "ეს დიზაინი კოლექციაში არ არის.",
  "themePreview.experience": "ღონისძიების გვერდი",
  "themePreview.design": "დიზაინი",
  "themePreview.makeYours": "შენებური გახადე",
  "themePreview.title": "ერთი თემა, მეტი ამბავი.",
  "themePreview.description":
    "აირჩიე ფუნქცია და ნახე ამ დიზაინში.",
  "themePreview.aria": "დამატებითი ღონისძიების მოდულების ნახვა",
  "themePreview.more": "მეტი დიზაინი",
  "themeExplorer.choose": "აირჩიე დიზაინი",
  "themeExplorer.title": "ერთი დღესასწაული, შენი სტილის უამრავი გზა.",
  "themeExplorer.description":
    "დაიწყე ვიზუალური სამყაროთი, რომელიც მოგწონს. მოსაწვევები და დამატებითი ფუნქციები მას მოერგება.",
  "surprise.phone.made": "ერთი ადამიანისთვის შექმნილი",
  "surprise.phone.photo": "ორი მეგობარი ზღვისპირა ტერასაზე",
  "surprise.phone.open": "გახსენი ეს პატარა სამყარო",
  "surprise.cover.fromTo": "{from}-სგან · {to}-სთვის",
  "surprise.cover.begin": "დაიწყე სიურპრიზი",
  "surprise.cover.bottom": "შენთვის შექმნილი პატარა სამყარო",
  "surprise.message.label": "01 / გულიდან",
  "surprise.message.title": "გილოცავ დაბადების დღეს, {name}.",
  "surprise.message.sign": "მთელი სიყვარულით, {name}",
  "surprise.notes.label": "03 / პატარა ამბები",
  "surprise.notes.title": "რაც შენში მიყვარს.",
  "surprise.memories.label": "04 / გახსოვს?",
  "surprise.memories.title": "დღეები, რომლებსაც ვიხსენებ.",
  "surprise.gallery.label": "05 / ჩვენი ფოტოები",
  "surprise.gallery.title": "კიდევ მეტი საერთო მომენტი.",
  "surprise.gallery.description":
    "სხვადასხვა ადგილი, იგივე საყვარელი ადამიანი.",
  "surprise.timeline.label": "06 / ჩვენი ამბავი",
  "surprise.timeline.title": "ნახე, რამდენი გზა გამოვიარეთ.",
  "surprise.quiz.label": "07 / გახსოვს?",
  "surprise.quiz.title": "პატარა კითხვა შენთვის.",
  "surprise.quiz.choose": "აირჩიე პასუხი და მოგონება გაიხსენე.",
  "surprise.quiz.correct": "გახსოვს! ამ დღეზე დღემდე ვლაპარაკობთ.",
  "surprise.quiz.wrong": "თითქმის! ჩვენი თავგადასავალი სანაპიროზე დაიწყო.",
  "surprise.wishes.label": "08 / მომავალი წლისთვის",
  "surprise.wishes.title": "ჩემი სურვილები შენთვის.",
  "surprise.music.label": "არჩევითი / ჩვენი სიმღერა",
  "surprise.music.title": "ჩვენი სამყაროს სიმღერა.",
  "surprise.music.description":
    "მუსიკაც შეიძლება შენი სიურპრიზის ნაწილი გახდეს. ამ მაგალითს ხმა არ ახლავს.",
  "surprise.cake.aria": "დაბადების დღის ტორტი სამი სანთლით",
  "surprise.cake.candle": "ჩააქრე სანთელი {number}",
  "surprise.cake.label": "02 / პატარა სურვილი",
  "surprise.cake.title": "ჩაიფიქრე სურვილი.",
  "surprise.cake.description":
    "სამი სანთელი და ერთი დიდი სურვილი. ეს პატარა მომენტი მხოლოდ შენია.",
  "surprise.cake.made": "ჩაფიქრებულია!",
  "surprise.cake.blessing": "დაე, ეს წელი შენსავით მშვენიერი იყოს.",
  "surprise.cake.relight": "თავიდან აანთე",
  "surprise.cake.tap": "შეეხე თითოეულ სანთელს ჩასაქრობად.",
  "surprise.cake.blowAll": "ჩააქრე ყველა",
  "surprise.cake.wish": "ჩაიფიქრე სურვილი",
  "surprise.gift.label": "09 / მხოლოდ შენთვის",
  "surprise.gift.title": "პატარა რამ შენთვის.",
  "surprise.gift.description": "კიდევ ერთი რამ მინდა გაჩუქო.",
  "surprise.gift.wrap": "ისევ შეფუთე",
  "surprise.gift.open": "გახსენი საჩუქარი",
  "surprise.letter.label": "10 / კიდევ ერთი რამ",
  "surprise.letter.title": "ჩემი წერილი შენთვის.",
  "surprise.letter.description": "ზოგიერთ სიტყვას საკუთარი ადგილი სჭირდება.",
  "surprise.letter.envelope": "შენთვის, ყოველთვის.",
  "surprise.letter.close": "დახურე წერილი",
  "surprise.letter.open": "გახსენი წერილი",
  "surprise.letter.sign": "სიყვარულით, {name}",
  "surprises.label": "ციფრული სიურპრიზი / 11:11",
  "surprises.showcase.description":
    "წერილზე მეტი — ფოტოები, მოგონებები და სიურპრიზები მისთვის შექმნილ პატარა სამყაროში.",
  "surprises.create": "შექმენი სიურპრიზი",
  "surprises.openExample": "სცადე დაბადების დღის დემო",
  "surprises.launchNote":
    "შენ შექმნი და პირადი ბმულით გააზიარებ. ეს ფუნქცია მალე დაემატება.",
  "surprises.flow.label": "როგორ იქმნება",
  "surprises.flow.title": "მისი სამყარო ხუთ ნაბიჯში.",
  "surprises.flow.0": "აირჩიე მიზეზი",
  "surprises.flow.1": "აირჩიე თემა",
  "surprises.flow.2": "დაამატე მოგონებები",
  "surprises.flow.3": "გაახალისე სიურპრიზი",
  "surprises.flow.4": "გააზიარე სიურპრიზი",
  "surprises.config.label": "შექმენი სიურპრიზი · წინასწარი ვერსია",
  "surprises.config.title": "დაიწყე მისი ისტორიით.",
  "surprises.config.description":
    "აირჩიე მიზეზი, დიზაინი და მომენტები. ეს ნიმუში საცდელ შიგთავსს იყენებს და შენს არჩევანს არ ინახავს.",
  "surprises.occasion.title": "რას აღნიშნავ?",
  "surprises.occasion.description":
    "განსაკუთრებულ დღეს ან ადამიანს.",
  "surprises.occasion.aria": "აირჩიე სიურპრიზის მიზეზი",
  "surprises.theme.title": "აირჩიე სტილი.",
  "surprises.theme.description": "11:11-ის საერთო თემები.",
  "surprises.theme.aria": "აირჩიე სიურპრიზის თემა",
  "surprises.modules.title": "დაამატე ის, რაც მას ჰგავს.",
  "surprises.modules.description":
    "შეურჩიე სიურპრიზს დეტალები.",
  "surprises.modules.aria": "აირჩიე დამატებითი მომენტები",
  "surprises.preview.label": "შენი არჩევანის ნიმუში",
  "surprises.preview.count": "არჩეულია {count} დამატებითი მომენტი",
  "surprises.preview.action": "დაბადების დღის მაგალითის ნახვა",
  "surprises.preview.note":
    "სრული ინტერაქტიული მაგალითი დაბადების დღის სიურპრიზია. აქ გაკეთებული არჩევანი მხოლოდ ამ ბრაუზერის წინასწარ ხედვას ეხება.",
  "surprises.share.label": "ბოლო შტრიხი",
  "surprises.share.title":
    "ერთი ბმული. მხოლოდ მისთვის.",
  "surprises.share.description":
    "შექმნისა და გაზიარების დამატების შემდეგ სიურპრიზს ყველგან გახსნის.",
  "surprises.share.note":
    "ბმული მხოლოდ მაგალითია · ამ ნიმუშში ბმული არ იქმნება",
  "surprises.demo.back": "ციფრული სიურპრიზი",
  "surprises.demo.label":
    "დაბადების დღის ინტერაქტიული მაგალითი · სანიმუშო შიგთავსი",
  "surprises.demo.eyebrow": "იგივე ისტორია, სხვა იერი",
  "surprises.demo.title": "სხვა თემა. იგივე გრძნობა.",
  "surprises.demo.description":
    "ქვემოთ მოცემული ყოველი ნაწილი შენ მიერ არჩეულ თემას მიჰყვება. ერთი ადამიანისთვის შექმნილ სიურპრიზს ღონისძიების ადგილი ან მონაწილეობის დადასტურება არ სჭირდება.",
  "surprises.demo.aria": "დაბადების დღის სიურპრიზის თემები",
  "surprises.demo.end": "შენს საყვარელ ადამიანსაც გაუხარებდი?",
  "surprises.specialPerson": "საყვარელი ადამიანისთვის",
  "loader.status": "ემოციები იტვირთება. გთხოვ, მოიცადე.",
  "loader.message": "ემოციები იტვირთება...",
  "loader.wait": "გთხოვ, მოიცადე...",
  "meta.title": "11:11 — აქციე მომენტი განსაკუთრებულად",
  "meta.description": "11:11 — სივრცე მომენტებისთვის, რომლებიც მნიშვნელოვანია.",
  "moodboard.language": "დიზაინის ენა",
  "moodboard.type.title": "შრიფტი თავისი ხასიათით",
  "moodboard.type.description": "ასოები განწყობას დღესასწაულამდე ქმნიან.",
  "moodboard.shared": "კარგი დღეები ერთად ვიზეიმოთ",
  "moodboard.details.title": "პატარა დეტალები",
  "moodboard.details.description":
    "ფერები და ორნამენტები ერთ განწყობას ქმნის.",
  "moodboard.palette": "პალიტრა",
  "moodboard.palette.title": "ოთხი ფერი. ერთი განწყობა.",
  "moodboard.pattern": "ნიშნები და ორნამენტი",
  "moodboard.occasion": "დღესასწაული",
  "moodboard.support.title": "მოსაწვევის მიღმა",
  "moodboard.support.description":
    "შენი ზეიმის დეტალები ამავე სტილში.",
  "moodboard.saveDate": "დაიმახსოვრე თარიღი",
  "moodboard.details": "დეტალები",
  "moodboard.note": "პატარა წერილი",
  "moodboard.made": "11:11 · შექმნილია მომენტისთვის",
  "moodboard.disclaimer":
    "ეს დიზაინის ნიმუშებია. ინტერაქტიული ფუნქციები მომავალში შექმნილ ღონისძიებას ეკუთვნის.",
  "surprises.home.index": "03 / ციფრული სიურპრიზი",
  "surprises.hero.question": "შორს ხარ?",
  "surprises.hero.emphasis": "შეუქმენი რამე, რაც დაამახსოვრდება.",
  "surprises.home.description":
    "ფოტოები, მოგონებები, სურვილები და თამაშები — მხოლოდ მისთვის, სადაც უნდა იყოს.",
  "surprises.home.action": "ნახე სიურპრიზი",
  "surprises.home.note": "შეტყობინებაზე მეტი. მისთვის შექმნილი პატარა სამყარო.",
  "friendship.back": "დაბადების დღის მოდულები",
  "friendship.hero.label": "არჩევითი ღონისძიების მოდული / 11:11",
  "friendship.hero.title": "მეგობრობის დღიური — შენი მომენტისთვის.",
  "friendship.hero.description":
    "ჰკითხე მეგობრებს და შეინახე მათი ამბები. დღიური დაბადების დღის დიზაინს მოერგება.",
  "friendship.hero.action": "ნახე დაბადების დღის თემები",
  "friendship.looks.label": "ერთი ფუნქცია, მრავალი სახე",
  "friendship.looks.title": "ისტორია შენია. სტილი იცვლება.",
  "friendship.looks.description":
    "დღიური შენი ღონისძიების ნაწილია. სცადე ნიმუში დაბადების დღის ორ თემაში.",
  "friendship.questions.label": "კარგი კითხვები",
  "friendship.questions.title": "პატარა კითხვა ბევრ რამეს ხსნის",
  "friendship.questions.description":
    "ექვსი კითხვა მეგობრების საყვარელ მოგონებებზე.",
  "friendship.responses.label": "სანიმუშო პასუხები",
  "friendship.responses.title": "შესანახი პასუხები",
  "friendship.responses.description":
    "ამბები, რომლებიც შენს დღეს ახლავს.",
  "corporate.hero.label": "კორპორატიული / 11:11",
  "corporate.hero.title": "კარგი საქმე კარგ შეკრებას იმსახურებს.",
  "corporate.hero.description":
    "შექმენი კომპანიის ღონისძიება, რომელიც პირადი, გააზრებული და დასამახსოვრებელია.",
  "corporate.explore": "მოსაწვევის სტილები",
  "corporate.art.title": "შეკრება",
  "corporate.art.caption": "ადამიანები · მიზანი · შეხვედრის მიზეზი",
  "corporate.section.label": "ცოტა მეტი ადამიანურობა",
  "corporate.section.title": "ყველა მიზეზი ერთად ყოფნისთვის",
  "corporate.section.description":
    "მოქნილ ციფრულ სივრცეში ეტევა მოსაწვევი, დეტალები და შემდგომი მოგონებები.",
  "corporate.occasion.0": "კომპანიის ზეიმები",
  "corporate.occasion.1": "პრეზენტაციები",
  "corporate.occasion.2": "კერძო ვახშმები",
  "corporate.occasion.3": "გუნდის შეხვედრები",
  "corporate.occasion.4": "კონფერენციები",
  "corporate.occasion.5": "ნეთვორქინგის საღამოები",
  "corporate.note.title": "ახალი კოლექცია მზადდება.",
  "corporate.note.description":
    "კორპორატიული თემები მალე დაემატება. მოსაწვევი, გალერეა, სტუმრების წერილები და დეტალები შენს ღონისძიებას მოერგება.",
  "corporate.cta.title": "შეკრება დასამახსოვრებელი გახადე.",
  "corporate.cta.description":
    "სანამ კორპორატიული თემები მზადდება, გაეცანი უკვე არსებულ დიზაინებს.",
  "corporate.cta.action": "ნახე მოსაწვევები",
  "other.hero.label": "სხვა დღესასწაულები / 11:11",
  "other.hero.title": "ყოველ მიზეზს თავისი ჯადოსნობა აქვს.",
  "other.hero.description":
    "დიდი სიურპრიზიდან მშვიდ და მნიშვნელოვან მომენტამდე — ყველასთვის არის ადგილი.",
  "other.chooser.label": "აირჩიე მიზეზი",
  "other.chooser.title": "რას ვზეიმობთ?",
  "other.chooser.description":
    "ეს 11:11-ის სამყაროში შემომავალი ახალი დღესასწაულების პირველი ხედვაა.",
  "other.chooser.aria": "სხვა დღესასწაულების ტიპები",
  "other.preview.aria": "დღესასწაულის ტიპის წინასწარი ნახვა",
  "other.stage.label": "11:11 / ზეიმის ნიმუში",
  "other.stage.tag": "თემები მოგვიანებით დაემატება ",
  "other.cta.title": "შენი ზეიმი, შენი სტილი.",
  "other.cta.description":
    "კიდევ მეტი დიზაინი მალე გამოჩნდება. მანამდე ნახე, რისი შექმნა შეუძლია 11:11-ს.",
});

Object.assign(captions.en, {
  "nav.menu": "Menu",
  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",
  "appearance.label": "Appearance",
  "appearance.choice.dark": "Dark",
  "appearance.choice.light": "Light",
  "home.carousel.controls": "Browse invitations",
  "home.carousel.previous": "Previous invitation",
  "home.carousel.next": "Next invitation",
  "home.carousel.position": "{current} of {total}",
  "themeCanvas.aria": "{name} invitation design",
  "themeCanvas.birthdayInvite": "A BIRTHDAY INVITATION",
  "themeCanvas.weddingInvite": "A WEDDING INVITATION",
  "themeCanvas.gallery.label": "03 / MOMENTS",
  "themeCanvas.gallery.birthday.0": "The dance floor",
  "themeCanvas.gallery.birthday.1": "Make a wish",
  "themeCanvas.gallery.birthday.2": "Our people",
  "themeCanvas.gallery.birthday.3": "One more toast",
  "themeCanvas.gallery.wedding.0": "Together",
  "themeCanvas.gallery.wedding.1": "The table",
  "themeCanvas.gallery.wedding.2": "The promise",
  "themeCanvas.gallery.wedding.3": "The celebration",
  "themeCanvas.nav": "Event preview sections",
  "themeCanvas.nav.invitation": "Invitation",
  "themeCanvas.nav.details": "Details",
  "themeCanvas.nav.moments": "Moments",
  "themeCanvas.nav.rsvp": "RSVP",
  "themeCanvas.open": "Open the invitation",
  "themeCanvas.scroll": "SCROLL TO EXPLORE",
  "themeCanvas.story": "01 / THE STORY",
  "themeCanvas.invitation.label": "02 / THE INVITATION",
  "themeCanvas.invitation.title": "A first hello, made for this moment.",
  "themeCanvas.invitation.description":
    "This is how the celebration arrives: a little piece of the day, before the day begins.",
  "themeCanvas.celebration": "THE CELEBRATION",
  "themeCanvas.celebrateBirthday": "Come celebrate with us.",
  "themeCanvas.celebrateWedding": "Join us for the day.",
  "themeCanvas.when": "WHEN",
  "themeCanvas.at": "At {time}",
  "themeCanvas.where": "WHERE",
  "themeCanvas.birthdayShoes": "Bring your favorite dancing shoes",
  "themeCanvas.weddingSeeYou": "We can’t wait to see you there",
  "themeCanvas.countdown": "COUNTING DOWN",
  "themeCanvas.days": "{count} days",
  "themeCanvas.until": "Until the celebration",
  "themeCanvas.community": "04 / YOUR PEOPLE",
  "themeCanvas.rsvp": "05 / SAVE YOUR PLACE",
  "themeCanvas.reply": "Preview your reply",
  "themeCanvas.replied": "Reply previewed",
  "themeCanvas.replyNote":
    "A real event page would send this response to the host.",
  "themeCanvas.previewNote": "Interactive example · no response is saved",
  "themeCanvas.cardAria": "Preview {name} theme",
  "template.its": "IT’S",
  "template.birthday": "Birthday!",
  "template.turning": "Turning {age}",
  "template.date": "DATE",
  "template.time": "TIME",
  "template.place": "PLACE",
  "template.at": "at {time}",
  "template.together": "A new chapter, together",
  "modulePreview.label": "OPTIONAL MODULE",
  "modulePreview.guest": "— a guest at {name}’s event",
  "themePreview.notFound.title": "Theme not found",
  "themePreview.notFound.description": "That design isn’t in the collection.",
  "themePreview.experience": "EVENT EXPERIENCE",
  "themePreview.design": "DESIGN",
  "themePreview.makeYours": "MAKE IT YOURS",
  "themePreview.title": "One theme, more of your story.",
  "themePreview.description":
    "Choose an optional feature to see how it belongs inside this design.",
  "themePreview.aria": "Preview optional event modules",
  "themePreview.more": "Explore more designs",
  "themeExplorer.choose": "CHOOSE YOUR DESIGN",
  "themeExplorer.title": "One celebration. So many ways to make it yours.",
  "themeExplorer.description":
    "Start with a visual world you love. Invitations and optional features follow its look.",
  "surprise.phone.made": "MADE FOR ONE PERSON",
  "surprise.phone.photo": "Two friends on a coastal terrace",
  "surprise.phone.open": "Open this little world",
  "surprise.cover.fromTo": "FROM {from} · TO {to}",
  "surprise.cover.begin": "Begin the surprise",
  "surprise.cover.bottom": "A LITTLE WORLD MADE FOR YOU",
  "surprise.message.label": "01 / FROM THE HEART",
  "surprise.message.title": "Happy birthday, {name}.",
  "surprise.message.sign": "With all my love, {name}",
  "surprise.notes.label": "03 / THE LITTLE THINGS",
  "surprise.notes.title": "The little things I love about you.",
  "surprise.memories.label": "04 / REMEMBER WHEN",
  "surprise.memories.title": "The days I keep coming back to.",
  "surprise.gallery.label": "05 / OUR CAMERA ROLL",
  "surprise.gallery.title": "More moments together.",
  "surprise.gallery.description": "Different places, same favorite person.",
  "surprise.timeline.label": "06 / OUR STORY",
  "surprise.timeline.title": "Look how far we’ve come.",
  "surprise.quiz.label": "07 / DO YOU REMEMBER?",
  "surprise.quiz.title": "A little question for you.",
  "surprise.quiz.choose": "Choose an answer to reveal the memory.",
  "surprise.quiz.correct": "You remember! We still talk about that day.",
  "surprise.quiz.wrong": "Not quite. The coast was where the adventure began.",
  "surprise.wishes.label": "08 / FOR THE YEAR AHEAD",
  "surprise.wishes.title": "My wishes for you.",
  "surprise.music.label": "OPTIONAL / OUR SONG",
  "surprise.music.title": "A song for this little world.",
  "surprise.music.description":
    "Music can be part of your surprise. This example has no audio attached.",
  "surprise.cake.aria": "Birthday cake with three candles",
  "surprise.cake.candle": "Blow out candle {number}",
  "surprise.cake.label": "02 / A LITTLE WISH",
  "surprise.cake.title": "Make a wish.",
  "surprise.cake.description":
    "Three candles, one big wish. This little moment is all yours.",
  "surprise.cake.made": "Wish made",
  "surprise.cake.blessing": "May this year be as wonderful as you are.",
  "surprise.cake.relight": "Light them again",
  "surprise.cake.tap": "Tap each candle to blow it out.",
  "surprise.cake.blowAll": "Blow them all out",
  "surprise.cake.wish": "Make a wish",
  "surprise.gift.label": "09 / JUST FOR YOU",
  "surprise.gift.title": "A little something for you.",
  "surprise.gift.description": "There is one more thing I wanted to give you.",
  "surprise.gift.wrap": "Wrap it again",
  "surprise.gift.open": "Open your gift",
  "surprise.letter.label": "10 / ONE LAST THING",
  "surprise.letter.title": "A letter from me to you.",
  "surprise.letter.description": "Some words deserve a place of their own.",
  "surprise.letter.envelope": "For you, always.",
  "surprise.letter.close": "Close the letter",
  "surprise.letter.open": "Open the letter",
  "surprise.letter.sign": "With love, {name}",
  "surprises.label": "DIGITAL SURPRISE / 11:11",
  "surprises.showcase.description":
    "More than a message. A whole little world of photos, memories, wishes, and surprises, made for one person to open.",
  "surprises.create": "Create your surprise",
  "surprises.openExample": "Open the Birthday example",
  "surprises.launchNote":
    "Made by you. Shared through one private link when this experience is ready to launch.",
  "surprises.flow.label": "HOW IT COMES TOGETHER",
  "surprises.flow.title": "Five steps to a little world made for them.",
  "surprises.flow.0": "Choose an occasion",
  "surprises.flow.1": "Pick a theme",
  "surprises.flow.2": "Add your memories",
  "surprises.flow.3": "Add interactive moments",
  "surprises.flow.4": "Share the surprise",
  "surprises.config.label": "CREATE YOUR SURPRISE · FRONTEND PREVIEW",
  "surprises.config.title": "Start with their story.",
  "surprises.config.description":
    "Choose a reason, a look, and the moments you want to include. This preview uses sample content and does not save your choices.",
  "surprises.occasion.title": "What are you celebrating?",
  "surprises.occasion.description":
    "A special day, or simply a special person.",
  "surprises.occasion.aria": "Choose a surprise occasion",
  "surprises.theme.title": "Give it a look.",
  "surprises.theme.description": "These are the same themes used across 11:11.",
  "surprises.theme.aria": "Choose a surprise theme",
  "surprises.modules.title": "Add what feels like them.",
  "surprises.modules.description":
    "Pick the moments that belong in their surprise.",
  "surprises.modules.aria": "Choose optional surprise moments",
  "surprises.preview.label": "A PREVIEW OF YOUR DIRECTION",
  "surprises.preview.count": "{count} optional moments selected",
  "surprises.preview.action": "Preview the Birthday example",
  "surprises.preview.note":
    "The full interactive example is a Birthday Surprise. Your choices here are local to this browser preview.",
  "surprises.share.label": "THE FINISHING TOUCH",
  "surprises.share.title": "One beautiful link. One person you made it for.",
  "surprises.share.description":
    "When creation and sharing are available, your surprise will be ready for them to open wherever they are.",
  "surprises.share.note":
    "Illustrative link only · no link is created in this demo",
  "surprises.demo.back": "Digital Surprise",
  "surprises.demo.label": "INTERACTIVE BIRTHDAY EXAMPLE · SAMPLE CONTENT",
  "surprises.demo.eyebrow": "SAME STORY, DIFFERENT LOOK",
  "surprises.demo.title": "Switch the theme. Keep the feeling.",
  "surprises.demo.description":
    "Each section below follows the theme you choose. No event venue or RSVP is needed for a surprise made for one person.",
  "surprises.demo.aria": "Preview birthday surprise themes",
  "surprises.demo.end": "Want to imagine one for your person?",
  "surprises.specialPerson": "For someone special",
  "loader.status": "Feelings are loading. Please wait.",
  "loader.message": "Feelings are loading....",
  "loader.wait": "Please Wait...",
  "meta.title": "11:11 — Make it count",
  "meta.description": "11:11 — make room for the moments that count.",
  "moodboard.language": "THE DESIGN LANGUAGE",
  "moodboard.type.title": "Type with a point of view",
  "moodboard.type.description":
    "The lettering sets the mood before the celebration begins.",
  "moodboard.shared": "GOOD DAYS ARE MEANT TO BE SHARED",
  "moodboard.details.title": "The little details",
  "moodboard.details.description":
    "Color, pattern, and small marks carry the same feeling throughout.",
  "moodboard.palette": "THE PALETTE",
  "moodboard.palette.title": "Four colors. One feeling.",
  "moodboard.pattern": "MARKS & PATTERN",
  "moodboard.occasion": "THE OCCASION",
  "moodboard.support.title": "Beyond the invitation",
  "moodboard.support.description":
    "A few visual pieces from the wider event world this design could create.",
  "moodboard.saveDate": "SAVE THE DATE",
  "moodboard.details": "EVENT DETAILS",
  "moodboard.note": "A LITTLE NOTE",
  "moodboard.made": "11:11 · MADE FOR THE MOMENT",
  "moodboard.disclaimer":
    "These are design samples. Interactive event features belong to the future created experience.",
  "surprises.home.index": "03 / DIGITAL SURPRISE",
  "surprises.hero.question": "Can’t be there in person?",
  "surprises.hero.emphasis": "Make them something they’ll remember.",
  "surprises.home.description":
    "Photos, memories, wishes, and interactive little moments. All made for one person to open, wherever they are.",
  "surprises.home.action": "Explore Digital Surprise",
  "surprises.home.note":
    "More than a message. A whole little world made for them.",
  "friendship.back": "Birthday modules",
  "friendship.hero.label": "OPTIONAL EVENT MODULE / 11:11",
  "friendship.hero.title": "Friendship Diary, made for your moment.",
  "friendship.hero.description":
    "Ask the questions only your people could answer. Add the diary to a Birthday event and let its look follow the design you choose.",
  "friendship.hero.action": "Explore Birthday themes",
  "friendship.looks.label": "ONE FEATURE, MANY LOOKS",
  "friendship.looks.title": "The story stays yours. The style changes.",
  "friendship.looks.description":
    "A Friendship Diary is part of an event, not a separate app. Here is the same preview in two Birthday themes.",
  "friendship.questions.label": "GOOD QUESTIONS",
  "friendship.questions.title": "A little prompt goes a long way",
  "friendship.questions.description":
    "Six example questions help friends share the moments they remember best.",
  "friendship.responses.label": "MOCK RESPONSES",
  "friendship.responses.title": "Answers worth keeping",
  "friendship.responses.description":
    "A preview of the kind of stories that can live inside an event.",
  "corporate.hero.label": "CORPORATE / 11:11",
  "corporate.hero.title": "Good work deserves a good gathering.",
  "corporate.hero.description":
    "Make a company event feel personal, considered, and worth remembering.",
  "corporate.explore": "Explore invitation styles",
  "corporate.art.title": "THE GATHERING",
  "corporate.art.caption": "people · purpose · a reason to meet",
  "corporate.section.label": "A LITTLE MORE HUMAN",
  "corporate.section.title": "For every reason to bring people together",
  "corporate.section.description":
    "A flexible digital event space can carry the invitation, the details, and the memories that follow.",
  "corporate.occasion.0": "Company celebrations",
  "corporate.occasion.1": "Product launches",
  "corporate.occasion.2": "Private dinners",
  "corporate.occasion.3": "Team events",
  "corporate.occasion.4": "Conferences",
  "corporate.occasion.5": "Networking nights",
  "corporate.note.title": "The next collection is taking shape.",
  "corporate.note.description":
    "Corporate-specific themes are on the way. The same invitation, gallery, guest message, and event-detail modules can adapt to your occasion.",
  "corporate.cta.title": "Make the gathering memorable.",
  "corporate.cta.description":
    "Explore the design language already available while corporate themes are in progress.",
  "corporate.cta.action": "Browse invitations",
  "other.hero.label": "OTHER CELEBRATIONS / 11:11",
  "other.hero.title": "Every reason has its own magic.",
  "other.hero.description":
    "From the big surprises to the quiet milestones, there’s room to make it yours.",
  "other.chooser.label": "CHOOSE AN OCCASION",
  "other.chooser.title": "What are we celebrating?",
  "other.chooser.description":
    "These are the first looks at more celebrations joining the 11:11 world.",
  "other.chooser.aria": "Other celebration types",
  "other.preview.aria": "Preview a celebration type",
  "other.stage.label": "11:11 / OCCASION PREVIEW",
  "other.stage.tag": "Themes coming later ",
  "other.cta.title": "Your occasion, your way.",
  "other.cta.description":
    "More designs are on the way. Start by exploring what 11:11 can already create.",
});

const showcaseCopy = {
  ka: {
    birthdayPrompts: [
      ["საყვარელი მოგონება", "ის, რომელზეც დღემდე ლაპარაკობთ."],
      ["სასაცილო მომენტი", "ისტორია, რომელიც არასდროს ძველდება."],
      ["პირველი შთაბეჭდილება", "როგორ დაიწყო თქვენი ამბავი."],
      ["მომავლისთვის", "წერილი მომავლისთვის."],
    ],
    birthdayGames: [
      ["ვინ მიცნობს ყველაზე კარგად?", "პატარა მეგობრული შეჯიბრი."],
      [
        "დაბადების დღის ქვიზი",
        "პასუხები მხოლოდ მეგობრებმა იციან.",
      ],
      ["ეს თუ ის", "სწრაფი არჩევანი, ბევრი აზრი."],
      ["გამოიცანი მოგონება", "ვის ახსოვს, რა მოხდა?"],
    ],
    weddingFeatures: [
      ["ციფრული მოსაწვევი", "ლამაზი პირველი მისალმება."],
      ["პასუხი", "პასუხის მარტივი გზა."],
      ["სტუმრების წიგნი", "თბილი სიტყვები შესანახად."],
      ["წყვილის ისტორია", "თქვენი გზა თქვენი სიტყვებით."],
      ["დღის განრიგი", "ყოველ მომენტს თავისი ადგილი."],
      ["ადგილი", "დაეხმარე ყველას გზის პოვნაში."],
      ["ფოტომოგონებები", "დღე ყველა თვალით."],
    ],
    friendshipQuestions: [
      [
        "როგორ გავიცანით?",
        "მეგობრობის პირველი გვერდი.",
      ],
      [
        "პირველი შთაბეჭდილება ჩემზე",
        "გულწრფელად მითხარი. ახლა ამაზე სიცილი შეგვიძლია.",
      ],
      [
        "საყვარელი მოგონება ჩემთან",
        "დიდიც და პატარაც ძვირფასია.",
      ],
      ["სასაცილო საერთო მომენტი", "ის, რომელსაც დღემდე ვიხსენებთ."],
      ["აღმწერე სამი სიტყვით", "სამი სიტყვა არც ისე ადვილია."],
      ["წერილი მომავლისთვის", "მოგვიანებით გასახსენებლად."],
    ],
  },
  en: {
    birthdayPrompts: [
      ["Favorite memory", "The one you still talk about."],
      ["Funniest moment", "The story that never gets old."],
      ["First impression", "How the story began."],
      ["For the future", "A note to open one day."],
    ],
    birthdayGames: [
      ["Who Knows Me Best?", "A little friendly competition."],
      ["Birthday Quiz", "Questions only your people know."],
      ["This or That", "Quick choices, big opinions."],
      ["Guess the Memory", "Who remembers what happened?"],
    ],
    weddingFeatures: [
      ["Digital invitation", "A beautiful first hello."],
      ["RSVP", "A simple way to hear back."],
      ["Guest book", "Kind words to keep."],
      ["Couple story", "Your journey, in your words."],
      ["Event schedule", "Every moment in its place."],
      ["Location", "Help everyone find their way."],
      ["Photo memories", "The day through every lens."],
    ],
    friendshipQuestions: [
      ["How did we meet?", "Every friendship has a first page."],
      ["Your first impression of me", "Be honest. We can laugh about it now."],
      ["Favorite memory with me", "Big or small, it all counts."],
      ["Funniest moment together", "The one we still bring up."],
      ["Describe me in three words", "Three is harder than it sounds."],
      ["A message for the future", "Something to return to later."],
    ],
  },
};

for (const language of languages) {
  for (const [group, entries] of Object.entries(showcaseCopy[language])) {
    entries.forEach(([title, detail], index) => {
      captions[language][`showcase.${group}.${index}.title`] = title;
      captions[language][`showcase.${group}.${index}.detail`] = detail;
    });
  }
}

const moduleCatalog = [
  [
    "invitation",
    "მოსაწვევი",
    "ლამაზი პირველი მისალმება.",
    "Invitation",
    "A beautiful first hello.",
  ],
  [
    "countdown",
    "უკუთვლა",
    "სიხარული მოლოდინშიცაა.",
    "Countdown",
    "Let the excitement build.",
  ],
  [
    "gallery",
    "ფოტოგალერეა",
    "დღე ყველა თვალით.",
    "Photo Gallery",
    "The day through every lens.",
  ],
  [
    "rsvp",
    "პასუხი",
    "პასუხის მარტივი გზა.",
    "RSVP",
    "A simple way to hear back.",
  ],
  [
    "friendship-diary",
    "მეგობრობის დღიური",
    "პასუხები მხოლოდ მეგობრებმა იციან.",
    "Friendship Diary",
    "Questions only your friends could answer.",
  ],
  [
    "guest-book",
    "სტუმრების წიგნი",
    "თბილი სიტყვები შესანახად.",
    "Guest Book",
    "Kind words to keep close.",
  ],
  [
    "memories",
    "მოგონებები",
    "ამბები ისევ გასახსენებლად.",
    "Memories",
    "Stories worth returning to.",
  ],
  [
    "quiz",
    "ქვიზი",
    "კითხვები მეგობრებისთვის.",
    "Quiz",
    "Playful questions for your people.",
  ],
  [
    "games",
    "თამაშები",
    "ცოტა გართობა.",
    "Games",
    "A little fun between moments.",
  ],
  [
    "guest-messages",
    "სტუმრების წერილები",
    "წერილები საყვარელი ადამიანებისგან.",
    "Guest Messages",
    "Notes from the people who matter.",
  ],
  [
    "event-details",
    "დეტალები",
    "ყველაფერი სტუმრებისთვის.",
    "Event Details",
    "Everything guests need to know.",
  ],
  [
    "main-message",
    "მთავარი წერილი",
    "შენი სათქმელი მისთვის.",
    "Main Message",
    "The words you most want them to hear.",
  ],
  [
    "cake",
    "ინტერაქტიული ტორტი",
    "ჩააქრე სანთლები და ჩაიფიქრე სურვილი.",
    "Interactive Cake",
    "A birthday wish they can make themselves.",
  ],
  [
    "love-notes",
    "პირადი წერილები",
    "რაც მას განსაკუთრებულს ხდის.",
    "Personal Notes",
    "All the little things that make them special.",
  ],
  [
    "wishes",
    "სურვილები",
    "სურვილები მომავლისთვის.",
    "Wishes",
    "Hopes for all that is still to come.",
  ],
  [
    "gift",
    "ციფრული საჩუქარი",
    "პატარა სიურპრიზი მხოლოდ მისთვის.",
    "Virtual Gift",
    "A little reveal saved just for them.",
  ],
  [
    "letter",
    "ბოლო წერილი",
    "კიდევ ერთი გულწრფელი წერილი.",
    "Final Letter",
    "One last note from the heart.",
  ],
  [
    "timeline",
    "ჩვენი ისტორია",
    "თქვენი საერთო გზა.",
    "Our Story",
    "The moments that brought you here.",
  ],
  [
    "music",
    "მუსიკა",
    "ადგილი თქვენი სიმღერისთვის.",
    "Music",
    "A place for your song, when you have one.",
  ],
];
const occasionCatalog = [
  [
    "birthday",
    "დაბადების დღე",
    "კიდევ ერთი შენი წელი.",
    "ადამიანისთვის, რომლის დღე უბრალოდ შეტყობინებაზე მეტს იმსახურებს.",
    "Birthday",
    "Another year of you.",
    "For the person whose day deserves more than a text.",
  ],
  [
    "friendship",
    "მეგობრობა",
    "ჩემი საყვარელი ადამიანისთვის.",
    "თქვენი ხუმრობები და საერთო ისტორიები ერთ სივრცეში.",
    "Friendship",
    "For my favorite person.",
    "All your inside jokes and shared stories in one place.",
  ],
  [
    "romantic",
    "რომანტიკა",
    "პატარა სამყარო ჩვენთვის.",
    "რაღაც ნაზი, რასაც ერთმანეთის მონატრებისას გახსნით.",
    "Romantic",
    "A little world for us.",
    "Something tender to open whenever you miss each other.",
  ],
  [
    "anniversary",
    "წლისთავი",
    "კიდევ ერთი თავი ერთად.",
    "გაიხსენეთ ყველაფერი, რაც ერთად გაიარეთ.",
    "Anniversary",
    "Another chapter together.",
    "A way to revisit everything you have become together.",
  ],
  [
    "graduation",
    "გამოშვება",
    "ნახე, რამდენს მიაღწიე.",
    "შრომის, გამბედაობისა და გვერდით მდგომი ადამიანების ზეიმი.",
    "Graduation",
    "Look how far you came.",
    "A celebration of the work, courage, and people behind it.",
  ],
  [
    "just-because",
    "უმიზეზოდ",
    "დღეს ამას იმსახურებ.",
    "ადამიანის გახარებას განსაკუთრებული მიზეზი არ სჭირდება.",
    "Just Because",
    "You deserve this today.",
    "No occasion needed to make someone feel seen.",
  ],
];
for (const language of languages) {
  for (const [
    id,
    kaTitle,
    kaDescription,
    enTitle,
    enDescription,
  ] of moduleCatalog) {
    const values = [kaTitle, kaDescription, enTitle, enDescription];
    const offset = languages.indexOf(language) * 2;
    captions[language][`modules.${id}.title`] = values[offset];
    captions[language][`modules.${id}.description`] = values[offset + 1];
  }
  for (const [id, ...values] of occasionCatalog) {
    const [label, headline, note] = values.slice(
      languages.indexOf(language) * 3,
      languages.indexOf(language) * 3 + 3
    );
    captions[language][`occasions.${id}.label`] = label;
    captions[language][`occasions.${id}.headline`] = headline;
    captions[language][`occasions.${id}.note`] = note;
  }
}

Object.assign(captions.ka, {
  "appearance.dark": "მუქი რეჟიმი",
  "appearance.light": "ღია რეჟიმი",
  "appearance.switchDark": "მუქ რეჟიმზე გადართვა",
  "appearance.switchLight": "ღია რეჟიმზე გადართვა",
});
Object.assign(captions.en, {
  "appearance.dark": "Dark mode",
  "appearance.light": "Light mode",
  "appearance.switchDark": "Switch to dark mode",
  "appearance.switchLight": "Switch to light mode",
});

// Public product demos share the existing language system.
const productCopy = {
  en: {
    "home.projects.description":
      "Digital invitations and personal surprises. Choose an occasion, explore a style, and see what your people will open.",
    "home.possibilities.description":
      "An image says when and where. An 11:11 page can bring people into the moment: invite them before, play together during, and return to the memories after.",
    "home.final.description":
      "Choose your moment → find your style → make it personal → preview. Explore the demos while we prepare creation and private sharing.",
    "home.interactive.description":
      "A few thoughtful extras, chosen for your occasion. Start with what matters; add only what makes it more personal.",
    "product.demo.label": "11:11 / GUEST DEMO",
    "product.demo.title": "Beyond the invitation.",
    "product.demo.description":
      "Open a sample experience with the details, memories, and a reply. No account needed.",
    "product.demo.action": "See the guest experience",
    "product.demo.notice":
      "Sample guest experience. Replies are a local demo and are not sent or saved. Template unlocking and private event links are coming later.",
    "product.rsvp.question": "Will you be there?",
    "product.rsvp.going": "I’ll be there",
    "product.rsvp.declined": "I can’t make it",
    "product.rsvp.plusOne": "I’m bringing one guest",
    "product.rsvp.submit": "Preview my reply",
    "product.rsvp.going.confirmation":
      "Your sample reply: attending · {count} seat(s).",
    "product.rsvp.declined.confirmation":
      "Your sample reply: unable to attend. You can still enjoy the memories.",
    "product.rsvp.edit": "Change my reply",
    "product.rsvp.demo":
      "Demo only. Nothing is sent to an organizer or saved. This sample invitation allows one extra guest.",
    "product.personalize.title": "Make it personal",
    "product.personalize.description":
      "Just a name and a few words. Leave these empty to try the sample.",
    "product.personalize.recipientName": "For",
    "product.personalize.creatorName": "From",
    "product.personalize.message": "Your personal message",
    "product.personalize.note":
      "Preview only. Your text stays in this browser’s navigation, not in the link. Photos and stories below are sample content.",
    "product.surprise.birthday.title": "Happy birthday, {name}!",
    "product.surprise.letter":
      "Dear {name},\n\n{message}\n\nWith love,\n{from}",
    "surprises.config.description":
      "Try a theme, add your words, and choose a few little extras. This is a preview; publishing and contributions are coming later.",
    "surprises.preview.action": "Preview the surprise",
    "surprises.preview.note":
      "Your selected occasion, theme, and moments in one preview. No private link is created yet.",
    "surprises.demo.label": "Interactive surprise demo · sample content",
    "surprises.demo.aria": "Surprise themes",
    "surprises.demo.description":
      "Open, explore, and try the interactions. Photos and stories are samples; replies and changes are not saved.",
  },
  ka: {
    "home.projects.description":
      "ციფრული მოსაწვევები და პირადი სიურპრიზები. აირჩიე მომენტი, სტილი და ნახე ნიმუში.",
    "home.possibilities.description":
      "11:11-ზე ზეიმი მოსაწვევით იწყება: შემდეგ — ერთად გართობა და მოგონებები, რომლებსაც ისევ დაუბრუნდები.",
    "home.final.description":
      "აირჩიე მომენტი → სტილი → დაამატე სიტყვები → ნახე ნიმუში. შექმნა და პირადი გაზიარება მალე დაემატება.",
    "home.interactive.description":
      "დაამატე შენს მომენტს პირადი დეტალები. დაიწყე მთავარით და აირჩიე, რაც შენ გგავს.",
    "product.demo.label": "11:11 / სტუმრის დემო",
    "product.demo.title": "მოსაწვევზე მეტი.",
    "product.demo.description":
      "სცადე სტუმრის გვერდი: დეტალები, მოგონებები და პასუხი. ანგარიშის გარეშე.",
    "product.demo.action": "სცადე სტუმრის გვერდი",
    "product.demo.notice":
      "სტუმრის გამოცდილების ნიმუში. პასუხები მხოლოდ დემოა — არ იგზავნება და არ ინახება. შაბლონის გახსნა და პირადი ბმულები მოგვიანებით დაემატება.",
    "product.rsvp.question": "შემოგვიერთდები?",
    "product.rsvp.going": "მოვალ",
    "product.rsvp.declined": "ვერ მოვალ",
    "product.rsvp.plusOne": "მოვალ +1 სტუმრით",
    "product.rsvp.submit": "ნახე პასუხის ნიმუში",
    "product.rsvp.going.confirmation":
      "საცდელი პასუხი: მოვალ · {count} ადგილი.",
    "product.rsvp.declined.confirmation":
      "საცდელი პასუხი: ვერ მოვალ. მოგონებებს მაინც ნახავ.",
    "product.rsvp.edit": "პასუხის შეცვლა",
    "product.rsvp.demo":
      "დემოა: პასუხი არ იგზავნება და არ ინახება. შეგიძლია ერთი სტუმარიც მოიყვანო.",
    "product.personalize.title": "დაამატე შენი სიტყვები",
    "product.personalize.description":
      "სახელი და რამდენიმე სიტყვა. ნიმუშისთვის დატოვე ცარიელი.",
    "product.personalize.recipientName": "ვისთვის",
    "product.personalize.creatorName": "ვისგან",
    "product.personalize.message": "შენი წერილი",
    "product.personalize.note":
      "მხოლოდ წინასწარი ნახვა. შენი ტექსტი ბრაუზერის ნავიგაციაში რჩება და ბმულში არ ხვდება. ფოტოები და ისტორიები ნიმუშებია.",
    "product.surprise.birthday.title": "გილოცავ დაბადების დღეს, {name}!",
    "product.surprise.letter":
      "ძვირფასო {name},\n\n{message}\n\nსიყვარულით,\n{from}",
    "surprises.config.description":
      "სცადე თემა, დაამატე სიტყვები და დეტალები. ეს ნიმუშია; გამოქვეყნება და მეგობრების მონაწილეობა მალე დაემატება.",
    "surprises.preview.action": "ნახე სიურპრიზი",
    "surprises.preview.note":
      "შენი მომენტი, თემა და დეტალები ერთ ნიმუშში. პირადი ბმული ჯერ არ იქმნება.",
    "surprises.demo.label": "სიურპრიზის დემო · ნიმუში",
    "surprises.demo.aria": "სიურპრიზის თემები",
    "surprises.demo.description":
      "გახსენი და სცადე. ფოტოები და ამბები ნიმუშებია; პასუხები და ცვლილებები არ ინახება.",
  },
};
for (const language of languages)
  Object.assign(captions[language], productCopy[language]);
for (const language of languages)
  Object.assign(captions[language], authCopy[language]);

Object.assign(captions.en, {
  "catalog.title": "Find your invitation",
  "catalog.description": "Choose a design that feels like you.",
  "catalog.more": "Explore more for {category}",
  "catalog.occasion": "Occasion",
  "catalog.allOccasions": "All occasions",
  "catalog.corporateFilter": "Corporate occasion filters",
  "catalog.category": "Category",
  "catalog.filter": "Filter",
  "catalog.style.remove": "Remove style: {style}",
  "catalog.filters.applied": "Applied filters",
  "catalog.filters.reset": "Reset filters",
  "catalog.result.one": "{count} design found",
  "catalog.result.many": "{count} designs found",
  "catalog.empty.title": "No designs match yet",
  "catalog.empty.description":
    "Try another style, or reset the filter to see all designs in this category.",
  "catalog.back": "Back to results",
});
Object.assign(captions.ka, {
  "catalog.title": "იპოვე შენი მოსაწვევი",
  "catalog.description": "მოსაწვევი შენი განწყობით.",
  "catalog.more": "ნახე მეტი: {category}",
  "catalog.occasion": "მიზეზი",
  "catalog.allOccasions": "ყველა მიზეზი",
  "catalog.corporateFilter": "კორპორატიული ღონისძიების ფილტრები",
  "catalog.category": "კატეგორია",
  "catalog.filter": "ფილტრი",
  "catalog.style.remove": "სტილის წაშლა: {style}",
  "catalog.filters.applied": "არჩეული ფილტრები",
  "catalog.filters.reset": "გასუფთავება",
  "catalog.result.one": "{count} დიზაინი",
  "catalog.result.many": "{count} დიზაინი",
  "catalog.empty.title": "დიზაინი ვერ მოიძებნა",
  "catalog.empty.description":
    "სცადე სხვა სტილი ან გაასუფთავე ფილტრი.",
  "catalog.back": "შედეგებზე",
});

Object.assign(captions.ka, {
  "navigation.back": "უკან",
  "navigation.home": "მთავარზე",
  "navigation.design": "დიზაინზე",
  "navigation.invitations": "ყველა მოსაწვევი",
});

Object.assign(captions.en, {
  "invitations.other.title": "Celebration invitations",
  "invitations.other.description": "A first hello for every happy milestone.",
  "themeCanvas.gallery.other.0": "The happy guesses",
  "themeCanvas.gallery.other.1": "Sweet little details",
  "themeCanvas.gallery.other.2": "Our people",
  "themeCanvas.gallery.other.3": "The big surprise",
});

Object.assign(captions.ka, {
  "invitations.other.title": "დღესასწაულის მოსაწვევები",
  "invitations.other.description":
    "მოსაწვევი ყოველი ბედნიერი მომენტისთვის.",
  "themeCanvas.gallery.other.0": "მხიარული ვარაუდები",
  "themeCanvas.gallery.other.1": "პატარა დეტალები",
  "themeCanvas.gallery.other.2": "ჩვენი ადამიანები",
  "themeCanvas.gallery.other.3": "დიდი სიურპრიზი",
});

Object.assign(captions.en, {
  "project.bridal-party": "Bridal Parties",
  "project.bridal-party.description":
    "A celebration for the bride and her favorite people.",
  "catalog.subcategory": "Celebration subcategory",
  "catalog.allCelebrations": "All celebrations",
  "catalog.occasion.empty.title": "{occasion} designs are coming soon.",
  "catalog.occasion.empty.description":
    "Choose another celebration to explore the available designs.",
});
Object.assign(captions.ka, {
  "project.bridal-party": "პატარძლის წვეულება",
  "project.bridal-party.description":
    "პატარძლის წვეულება მეგობრებთან ერთად.",
  "catalog.subcategory": "ზეიმის ტიპი",
  "catalog.allCelebrations": "ყველა ზეიმი",
  "catalog.occasion.empty.title": "{occasion} — დიზაინები მალე.",
  "catalog.occasion.empty.description":
    "დიზაინების სანახავად აირჩიე სხვა ზეიმი.",
});

Object.assign(captions.en, {
  "themes.bridal-pink-disco.name": "Pink Disco Bride",
  "themes.bridal-pink-disco.description":
    "Blush satin, mirrored disco balls, and a sparkling night for the bride and her girls.",
  "themes.bridal-pink-disco.mood": "Pink \u00b7 disco \u00b7 bridal",
  "themes.bridal-pink-disco.style": "Pink disco, bridal bows & champagne",
});
Object.assign(captions.ka, {
  "themes.bridal-pink-disco.name": "პატარძლის დისკო",
  "themes.bridal-pink-disco.description":
    "ვარდისფერი ატლასი, დისკოს ბურთები და ბრჭყვიალა საღამო პატარძლისა და მისი მეგობრებისთვის.",
  "themes.bridal-pink-disco.mood": "ვარდისფერი · დისკო · პატარძალი",
  "themes.bridal-pink-disco.style": "ვარდისფერი დისკო, ბაფთები და შამპანური",
});

Object.assign(captions.en, {
  "themes.bridal-pink-line.name": "Pink Bridal Scrapbook",
  "themes.bridal-pink-line.description":
    "Pink paper collage, silver disco, and cocktail sketches for the bride and her girls.",
  "themes.bridal-pink-line.mood": "Pink \u00b7 hand-drawn \u00b7 bridal",
  "themes.bridal-pink-line.style": "Pink scrapbook paper & disco sketches",
});
Object.assign(captions.ka, {
  "themes.bridal-pink-line.name": "ვარდისფერი ესკიზები",
  "themes.bridal-pink-line.description":
    "ჟოლოსფერი კალმით დახატული დეტალები ვარდისფერ ქაღალდზე პატარძლისა და მისი მეგობრებისთვის.",
  "themes.bridal-pink-line.mood": "ვარდისფერი · ნახატი · პატარძალი",
  "themes.bridal-pink-line.style": "ჟოლოსფერი ხაზები და ვარდისფერი ქაღალდი",
});

Object.assign(captions.en, {
  "themeCanvas.gallery.bridal.0": "The bride and her girls",
  "themeCanvas.gallery.bridal.1": "A little sparkle",
  "themeCanvas.gallery.bridal.2": "Pink cocktails",
  "themeCanvas.gallery.bridal.3": "Dance floor memories",
});

Object.assign(captions.ka, {
  "themeCanvas.gallery.bridal.0": "პატარძალი და მეგობრები",
  "themeCanvas.gallery.bridal.1": "ცოტა ბრჭყვიალი",
  "themeCanvas.gallery.bridal.2": "ვარდისფერი კოქტეილები",
  "themeCanvas.gallery.bridal.3": "ცეკვის მოგონებები",
});

Object.assign(captions.en, {"themes.bridal-rose-supper-club.name": "Rose Supper Club", "themes.bridal-rose-supper-club.description": "Dusty rose paper, wine stripes, pearls, and vintage cocktails.", "themes.bridal-rose-supper-club.mood": "Sixties · rose · cocktails", "themes.bridal-rose-supper-club.style": "Dusty rose paper, wine stripes, pearls, and vintage cocktails."});

Object.assign(captions.ka, {"themes.bridal-rose-supper-club.name": "ვარდისფერი ვახშმის კლუბი", "themes.bridal-rose-supper-club.description": "რეტრო სტილის წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-rose-supper-club.mood": "რეტრო · პატარძალი · წვეულება", "themes.bridal-rose-supper-club.style": "რეტრო ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-electric-pink.name": "Electric Pink", "themes.bridal-electric-pink.description": "Hot pink paste-up, halftone disco, and an eighties dance floor.", "themes.bridal-electric-pink.mood": "Eighties · pink · bold", "themes.bridal-electric-pink.style": "Hot pink paste-up, halftone disco, and an eighties dance floor."});

Object.assign(captions.ka, {"themes.bridal-electric-pink.name": "ელექტრული ვარდისფერი", "themes.bridal-electric-pink.description": "რეტრო სტილის წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-electric-pink.mood": "რეტრო · პატარძალი · წვეულება", "themes.bridal-electric-pink.style": "რეტრო ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-peach-cherry.name": "Peach & Cherry", "themes.bridal-peach-cherry.description": "Seventies scallops, cherry cocktails, and warm peach paper.", "themes.bridal-peach-cherry.mood": "Seventies · peach · cherry", "themes.bridal-peach-cherry.style": "Seventies scallops, cherry cocktails, and warm peach paper."});

Object.assign(captions.ka, {"themes.bridal-peach-cherry.name": "ატამი და ალუბალი", "themes.bridal-peach-cherry.description": "რეტრო სტილის წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-peach-cherry.mood": "რეტრო · პატარძალი · წვეულება", "themes.bridal-peach-cherry.style": "რეტრო ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-pink-disco-scrapbook.name": "Pink Disco Scrapbook", "themes.bridal-pink-disco-scrapbook.description": "Torn pink paper, silver disco, and pencil cocktail sketches.", "themes.bridal-pink-disco-scrapbook.mood": "Pink · paper · disco", "themes.bridal-pink-disco-scrapbook.style": "Torn pink paper, silver disco, and pencil cocktail sketches."});

Object.assign(captions.ka, {"themes.bridal-pink-disco-scrapbook.name": "ვარდისფერი დისკო სკრაპბუქი", "themes.bridal-pink-disco-scrapbook.description": "რეტრო სტილის წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-pink-disco-scrapbook.mood": "რეტრო · პატარძალი · წვეულება", "themes.bridal-pink-disco-scrapbook.style": "რეტრო ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-pink-tea-club.name": "Pink Tea Club", "themes.bridal-pink-tea-club.description": "Pink gingham, scalloped paper, floral teacups, and a little cake.", "themes.bridal-pink-tea-club.mood": "Pink · tea · bows", "themes.bridal-pink-tea-club.style": "Pink gingham, scalloped paper, floral teacups, and a little cake."});

Object.assign(captions.ka, {"themes.bridal-pink-tea-club.name": "ვარდისფერი ჩაის კლუბი", "themes.bridal-pink-tea-club.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-pink-tea-club.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-pink-tea-club.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-malibu-bride.name": "Malibu Bride", "themes.bridal-malibu-bride.description": "Pink beach-club scallops, pool-blue accents, and a vintage convertible.", "themes.bridal-malibu-bride.mood": "Pink · poolside · Malibu", "themes.bridal-malibu-bride.style": "Pink beach-club scallops, pool-blue accents, and a vintage convertible."});

Object.assign(captions.ka, {"themes.bridal-malibu-bride.name": "მალიბუს პატარძალი", "themes.bridal-malibu-bride.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-malibu-bride.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-malibu-bride.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-dream-doll-bride.name": "Dream Doll Bride", "themes.bridal-dream-doll-bride.description": "Vintage pink doll-box stationery, pearls, and a charming fashion illustration.", "themes.bridal-dream-doll-bride.mood": "Pink · vintage · doll", "themes.bridal-dream-doll-bride.style": "Vintage pink doll-box stationery, pearls, and a charming fashion illustration."});

Object.assign(captions.ka, {"themes.bridal-dream-doll-bride.name": "საოცნებო თოჯინა პატარძალი", "themes.bridal-dream-doll-bride.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-dream-doll-bride.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-dream-doll-bride.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-pink-disco-dream.name": "Pink Disco Dream", "themes.bridal-pink-disco-dream.description": "Pink disco balls, sparkling silver stars, bows, and vintage party lettering.", "themes.bridal-pink-disco-dream.mood": "Pink · disco · sparkle", "themes.bridal-pink-disco-dream.style": "Pink disco balls, sparkling silver stars, bows, and vintage party lettering."});

Object.assign(captions.ka, {"themes.bridal-pink-disco-dream.name": "ვარდისფერი დისკოს ოცნება", "themes.bridal-pink-disco-dream.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-pink-disco-dream.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-pink-disco-dream.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});





Object.assign(captions.en, {"themes.bridal-pink-disco-dream-card.name": "Pink Disco Dream — Card", "themes.bridal-pink-disco-dream-card.description": "Pink disco balls, sparkling silver stars, bows, and vintage party lettering.", "themes.bridal-pink-disco-dream-card.mood": "Pink · disco · sparkle", "themes.bridal-pink-disco-dream-card.style": "Pink disco balls, sparkling silver stars, bows, and vintage party lettering."});

Object.assign(captions.ka, {"themes.bridal-pink-disco-dream-card.name": "ვარდისფერი დისკო — ბარათი", "themes.bridal-pink-disco-dream-card.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-pink-disco-dream-card.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-pink-disco-dream-card.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-modern-pink-line-card.name": "Pink After Hours", "themes.bridal-modern-pink-line-card.description": "Modern raspberry line art, champagne coupes, and airy pink paper.", "themes.bridal-modern-pink-line-card.mood": "Pink · line art · modern", "themes.bridal-modern-pink-line-card.style": "Modern raspberry line art, champagne coupes, and airy pink paper."});

Object.assign(captions.ka, {"themes.bridal-modern-pink-line-card.name": "ვარდისფერი საღამო", "themes.bridal-modern-pink-line-card.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-modern-pink-line-card.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-modern-pink-line-card.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-pink-cocktail-card.name": "Pink Cocktail Hour", "themes.bridal-pink-cocktail-card.description": "Clinking coupes, ribbon bows, and wine-pink etched details.", "themes.bridal-pink-cocktail-card.mood": "Pink · cocktails · bows", "themes.bridal-pink-cocktail-card.style": "Clinking coupes, ribbon bows, and wine-pink etched details."});

Object.assign(captions.ka, {"themes.bridal-pink-cocktail-card.name": "ვარდისფერი კოქტეილი", "themes.bridal-pink-cocktail-card.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-pink-cocktail-card.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-pink-cocktail-card.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-cool-girl-card.name": "Cool Girl Club", "themes.bridal-cool-girl-card.description": "Bold pink, checkerboard edges, and heart sunglasses.", "themes.bridal-cool-girl-card.mood": "Pink · hearts · attitude", "themes.bridal-cool-girl-card.style": "Bold pink, checkerboard edges, and heart sunglasses."});

Object.assign(captions.ka, {"themes.bridal-cool-girl-card.name": "გოგონების კლუბი", "themes.bridal-cool-girl-card.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-cool-girl-card.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-cool-girl-card.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-doll-pink-card.name": "Doll Pink Bride", "themes.bridal-doll-pink-card.description": "Fashion doll pink, scalloped stationery, pearls, and heels.", "themes.bridal-doll-pink-card.mood": "Pink · fashion · pearls", "themes.bridal-doll-pink-card.style": "Fashion doll pink, scalloped stationery, pearls, and heels."});

Object.assign(captions.ka, {"themes.bridal-doll-pink-card.name": "ვარდისფერი პატარძალი", "themes.bridal-doll-pink-card.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-doll-pink-card.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-doll-pink-card.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.bridal-retro-pink-card.name": "Retro Pink Social", "themes.bridal-retro-pink-card.description": "Warm pink seventies paper, cherries, and little daisies.", "themes.bridal-retro-pink-card.mood": "Pink · seventies · cherries", "themes.bridal-retro-pink-card.style": "Warm pink seventies paper, cherries, and little daisies."});

Object.assign(captions.ka, {"themes.bridal-retro-pink-card.name": "რეტრო ვარდისფერი", "themes.bridal-retro-pink-card.description": "ვარდისფერი რეტრო წვეულება პატარძლისა და მისი საყვარელი მეგობრებისთვის.", "themes.bridal-retro-pink-card.mood": "ვარდისფერი · რეტრო · პატარძალი", "themes.bridal-retro-pink-card.style": "ვარდისფერი ქაღალდი და წვეულების დეტალები"});

Object.assign(captions.en, {"themes.christening-olive-light.name": "Olive & Light", "themes.christening-olive-light.description": "A small watercolor olive sprig on plain ivory paper.", "themes.christening-olive-light.mood": "Watercolor · soft · simple", "themes.christening-olive-light.style": "A small watercolor olive sprig on plain ivory paper."});

Object.assign(captions.ka, {"themes.christening-olive-light.name": "ზეთისხილი და სინათლე", "themes.christening-olive-light.description": "აკვარელის პატარა ზეთისხილის რტო სპილოსძვლისფერ ქაღალდზე.", "themes.christening-olive-light.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-olive-light.style": "აკვარელის პატარა ზეთისხილის რტო სპილოსძვლისფერ ქაღალდზე."});

Object.assign(captions.en, {"themes.christening-blush-grace.name": "Blush & Grace", "themes.christening-blush-grace.description": "A blush watercolor ribbon and a few loose pink petals.", "themes.christening-blush-grace.mood": "Watercolor · soft · simple", "themes.christening-blush-grace.style": "A blush watercolor ribbon and a few loose pink petals."});

Object.assign(captions.ka, {"themes.christening-blush-grace.name": "ვარდისფერი სინაზე", "themes.christening-blush-grace.description": "აკვარელის ვარდისფერი ბაფთა და რამდენიმე ნაზი ფურცელი.", "themes.christening-blush-grace.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-blush-grace.style": "აკვარელის ვარდისფერი ბაფთა და რამდენიმე ნაზი ფურცელი."});

Object.assign(captions.en, {"themes.christening-little-blue-heaven.name": "Little Blue Heaven", "themes.christening-little-blue-heaven.description": "A soft blue watercolor bow with a few painted petals.", "themes.christening-little-blue-heaven.mood": "Watercolor · soft · simple", "themes.christening-little-blue-heaven.style": "A soft blue watercolor bow with a few painted petals."});

Object.assign(captions.ka, {"themes.christening-little-blue-heaven.name": "პატარა ცისფერი სამყარო", "themes.christening-little-blue-heaven.description": "აკვარელის ნაზი ცისფერი ბაფთა და რამდენიმე ფურცელი.", "themes.christening-little-blue-heaven.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-little-blue-heaven.style": "აკვარელის ნაზი ცისფერი ბაფთა და რამდენიმე ფურცელი."});

Object.assign(captions.en, {"themes.christening-ivory-blessing.name": "Ivory Blessing", "themes.christening-ivory-blessing.description": "Ivory paper with a small champagne watercolor ribbon.", "themes.christening-ivory-blessing.mood": "Watercolor · soft · simple", "themes.christening-ivory-blessing.style": "Ivory paper with a small champagne watercolor ribbon."});

Object.assign(captions.ka, {"themes.christening-ivory-blessing.name": "ნაზი დალოცვა", "themes.christening-ivory-blessing.description": "სპილოსძვლისფერი ქაღალდი და აკვარელის პატარა ბაფთა.", "themes.christening-ivory-blessing.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-ivory-blessing.style": "სპილოსძვლისფერი ქაღალდი და აკვარელის პატარა ბაფთა."});

Object.assign(captions.en, {"themes.christening-olive-ribbon.name": "Olive Ribbon Frame", "themes.christening-olive-ribbon.description": "An airy border of little olive sprigs and painted ribbons.", "themes.christening-olive-ribbon.mood": "Watercolor · soft · simple", "themes.christening-olive-ribbon.style": "An airy border of little olive sprigs and painted ribbons."});

Object.assign(captions.ka, {"themes.christening-olive-ribbon.name": "ზეთისხილის ბაფთა", "themes.christening-olive-ribbon.description": "ზეთისხილის პატარა რტოებისა და ბაფთების ნაზი ჩარჩო.", "themes.christening-olive-ribbon.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-olive-ribbon.style": "ზეთისხილის პატარა რტოებისა და ბაფთების ნაზი ჩარჩო."});

Object.assign(captions.en, {"themes.christening-blush-petals.name": "Blush Petal Frame", "themes.christening-blush-petals.description": "Light watercolor petals, tiny bows, and a little dove.", "themes.christening-blush-petals.mood": "Watercolor · soft · simple", "themes.christening-blush-petals.style": "Light watercolor petals, tiny bows, and a little dove."});

Object.assign(captions.ka, {"themes.christening-blush-petals.name": "ვარდისფერი ფურცლები", "themes.christening-blush-petals.description": "აკვარელის ნაზი ფურცლები, პატარა ბაფთები და მტრედი.", "themes.christening-blush-petals.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-blush-petals.style": "აკვარელის ნაზი ფურცლები, პატარა ბაფთები და მტრედი."});

Object.assign(captions.en, {"themes.christening-olive-dove.name": "Dove & Olive", "themes.christening-olive-dove.description": "A loosely painted dove and a few soft olive leaves.", "themes.christening-olive-dove.mood": "Watercolor · soft · simple", "themes.christening-olive-dove.style": "A loosely painted dove and a few soft olive leaves."});

Object.assign(captions.ka, {"themes.christening-olive-dove.name": "მტრედი და ზეთისხილი", "themes.christening-olive-dove.description": "ნაზად მოხატული მტრედი და ზეთისხილის რამდენიმე ფოთოლი.", "themes.christening-olive-dove.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-olive-dove.style": "ნაზად მოხატული მტრედი და ზეთისხილის რამდენიმე ფოთოლი."});

Object.assign(captions.en, {"themes.christening-blue-dove.name": "Blue Dove", "themes.christening-blue-dove.description": "A small watercolor dove with a soft blue ribbon.", "themes.christening-blue-dove.mood": "Watercolor · soft · simple", "themes.christening-blue-dove.style": "A small watercolor dove with a soft blue ribbon."});

Object.assign(captions.ka, {"themes.christening-blue-dove.name": "ცისფერი მტრედი", "themes.christening-blue-dove.description": "აკვარელის პატარა მტრედი და ნაზი ცისფერი ბაფთა.", "themes.christening-blue-dove.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-blue-dove.style": "აკვარელის პატარა მტრედი და ნაზი ცისფერი ბაფთა."});

Object.assign(captions.en, {"themes.christening-little-dreamer.name": "Little Dreamer", "themes.christening-little-dreamer.description": "A tiny sleeping baby, a simple watercolor frame, and soft painted sparkles.", "themes.christening-little-dreamer.mood": "Watercolor · soft · simple", "themes.christening-little-dreamer.style": "A tiny sleeping baby, a simple watercolor frame, and soft painted sparkles."});

Object.assign(captions.ka, {"themes.christening-little-dreamer.name": "პატარა მეოცნებე", "themes.christening-little-dreamer.description": "აკვარელის მძინარე პატარა, მარტივი ჩარჩო და ნაზი ბრჭყვიალა დეტალები.", "themes.christening-little-dreamer.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-little-dreamer.style": "აკვარელის მძინარე პატარა, მარტივი ჩარჩო და ნაზი ბრჭყვიალა დეტალები."});

Object.assign(captions.en, {"themes.christening-blue-full-frame.name": "Blue Watercolor Frame", "themes.christening-blue-full-frame.description": "A complete frame of little blue flowers, ribbons, and a soft dove.", "themes.christening-blue-full-frame.mood": "Watercolor · soft · simple", "themes.christening-blue-full-frame.style": "A complete frame of little blue flowers, ribbons, and a soft dove."});

Object.assign(captions.ka, {"themes.christening-blue-full-frame.name": "ცისფერი აკვარელის ჩარჩო", "themes.christening-blue-full-frame.description": "პატარა ცისფერი ყვავილების, ბაფთებისა და მტრედის სრული ჩარჩო.", "themes.christening-blue-full-frame.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-blue-full-frame.style": "პატარა ცისფერი ყვავილების, ბაფთებისა და მტრედის სრული ჩარჩო."});

Object.assign(captions.en, {"themes.christening-olive-full-frame.name": "Olive Watercolor Frame", "themes.christening-olive-full-frame.description": "A complete watercolor frame of soft olive leaves.", "themes.christening-olive-full-frame.mood": "Watercolor · soft · simple", "themes.christening-olive-full-frame.style": "A complete watercolor frame of soft olive leaves."});

Object.assign(captions.ka, {"themes.christening-olive-full-frame.name": "ზეთისხილის აკვარელის ჩარჩო", "themes.christening-olive-full-frame.description": "ზეთისხილის ნაზი ფოთლების აკვარელის სრული ჩარჩო.", "themes.christening-olive-full-frame.mood": "აკვარელი · ნაზი · მარტივი", "themes.christening-olive-full-frame.style": "ზეთისხილის ნაზი ფოთლების აკვარელის სრული ჩარჩო."});

Object.assign(captions.en, {
  "invitationOpening.action": "Open invitation",
  "invitationOpening.back": "Back to design",
  "invitationOpening.controls": "Invitation controls",
});
Object.assign(captions.ka, {
  "invitationOpening.action": "მოსაწვევის გახსნა",
  "invitationOpening.back": "დიზაინზე დაბრუნება",
  "invitationOpening.controls": "მოსაწვევის მართვა",
});
Object.assign(captions.en, {
  "invitationOpening.action": "View full-screen card",
  "invitationOpening.format": "Card format",
  "invitationOpening.original": "Original card",
  "invitationOpening.portrait": "Portrait card",
});
Object.assign(captions.ka, {
  "invitationOpening.action": "მოსაწვევი სრულ ეკრანზე",
  "invitationOpening.format": "მოსაწვევის ფორმატი",
  "invitationOpening.original": "ორიგინალი",
  "invitationOpening.portrait": "ვერტიკალური",
});

Object.assign(captions.ka, cardCopy.ka, {
  "cards.possessive": "{name}",
  "cards.sweet": "ტკბილი",
  "cards.y2k": "2000-იანები",
  "cards.party": "წვეულება",
  "cards.christening.opening": "პატარა ბედნიერება",
  "cards.christening.title": "ნათლობა",
  "cards.christening.closing": "ოჯახთან და საყვარელ ადამიანებთან ერთად",
  "cards.bridal.opening": "მოწვეული ხარ",
  "cards.bridal.title": "პატარძლის",
  "cards.engagement.opening": "ჩვენი ნიშნობა",
  "cards.bridal.toast": "პატარძლის წვეულება",
  "cards.reveal.bear-hug": "პატარა ჩახუტება",
  "cards.reveal.up-in-the-air": "პატარა სიურპრიზი",
  "cards.reveal.special-delivery": "პატარა გზავნილი",
  "cards.reveal.little-wonder": "პატარა სასწაული",
  "cards.reveal.pink-or-blue": "ვარდისფერი თუ ცისფერი?",
  "cards.reveal.default": "ვარდისფერი თუ ცისფერი?",
  "cards.reveal.invited": "შემოგვიერთდით სქესის გაგების წვეულებაზე",
  "cards.reveal.closing": "პატარა სიურპრიზი, დიდი სიყვარული.",
  "cards.wedding.saveDate": "შეინახეთ თარიღი",
  "cards.wedding.day": "ქორწილის დღე: {day}",
  "cards.wedding.step.0": "ცერემონია",
  "cards.wedding.step.1": "სადღეგრძელო",
  "cards.wedding.step.2": "ვახშამი",
  "cards.wedding.step.3": "ცეკვა",
  "cards.birthday": "დაბადების დღე",
  "cards.social.title.0": "დაბადების",
  "cards.social.title.1": "დღე",
  "cards.social.menu": "სასმელი · მუსიკა · მეგობრები",
  "cards.social.wear": "სტილი",
  "cards.social.time": "დრო",
  "cards.social.where": "ადგილი"
});

Object.assign(captions.en, cardCopy.en, {
  "cards.possessive": "{name}’s",
  "cards.sweet": "Sweet",
  "cards.y2k": "Y2K",
  "cards.party": "Party",
  "cards.christening.opening": "A little blessing",
  "cards.christening.title": "Christening",
  "cards.christening.closing": "Together with family & favorite people",
  "cards.bridal.opening": "YOU’RE INVITED TO",
  "cards.bridal.title": "Bridal",
  "cards.engagement.opening": "Celebrating our engagement",
  "cards.bridal.toast": "A toast to the bride-to-be",
  "cards.reveal.bear-hug": "A little bear hug",
  "cards.reveal.up-in-the-air": "A little surprise",
  "cards.reveal.special-delivery": "Special delivery!",
  "cards.reveal.little-wonder": "Oh, baby!",
  "cards.reveal.pink-or-blue": "Pink or Blue?",
  "cards.reveal.default": "He or She?",
  "cards.reveal.invited": "Join us for a gender reveal",
  "cards.reveal.closing": "A little surprise. A lot of love.",
  "cards.wedding.saveDate": "Save the date",
  "cards.wedding.day": "Wedding day: {day}",
  "cards.wedding.step.0": "The ceremony",
  "cards.wedding.step.1": "A little toast",
  "cards.wedding.step.2": "Dinner together",
  "cards.wedding.step.3": "Dancing all night",
  "cards.birthday": "Birthday",
  "cards.social.title.0": "BIRTHDAY",
  "cards.social.title.1": "PARTY",
  "cards.social.menu": "DRINKS · FOOD · MUSIC · VIBES",
  "cards.social.wear": "WEAR",
  "cards.social.time": "TIME",
  "cards.social.where": "WHERE"
});

Object.assign(captions.ka, {
  "cards.date.compact": "{day} {month} {year}",
  "cards.month.1": "იანვარი",
  "cards.month.2": "თებერვალი",
  "cards.month.3": "მარტი",
  "cards.month.4": "აპრილი",
  "cards.month.5": "მაისი",
  "cards.month.6": "ივნისი",
  "cards.month.7": "ივლისი",
  "cards.month.8": "აგვისტო",
  "cards.month.9": "სექტემბერი",
  "cards.month.10": "ოქტომბერი",
  "cards.month.11": "ნოემბერი",
  "cards.month.12": "დეკემბერი"
});

Object.assign(captions.en, {
  "cards.date.compact": "{day} {month} {year}",
  "cards.month.1": "January",
  "cards.month.2": "February",
  "cards.month.3": "March",
  "cards.month.4": "April",
  "cards.month.5": "May",
  "cards.month.6": "June",
  "cards.month.7": "July",
  "cards.month.8": "August",
  "cards.month.9": "September",
  "cards.month.10": "October",
  "cards.month.11": "November",
  "cards.month.12": "December"
});

Object.assign(captions.en, girlyBirthdayCaptions.en);
Object.assign(captions.ka, girlyBirthdayCaptions.ka);

Object.assign(captions.en, comicBirthdayCaptions.en, poolBirthdayCaptions.en);
Object.assign(captions.ka, comicBirthdayCaptions.ka, poolBirthdayCaptions.ka);

Object.assign(captions.en, pizzaBirthdayCaptions.en);
Object.assign(captions.ka, pizzaBirthdayCaptions.ka);

Object.assign(captions.en, cocktailBirthdayCaptions.en);
Object.assign(captions.ka, cocktailBirthdayCaptions.ka);

Object.assign(captions.en, pinkChampagneCaptions.en);
Object.assign(captions.ka, pinkChampagneCaptions.ka);

Object.assign(captions.en, selectedBridalCaptions.en);
Object.assign(captions.ka, selectedBridalCaptions.ka);

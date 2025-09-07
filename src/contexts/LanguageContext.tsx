import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'ar';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traductions
const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    sports: 'Sports',
    culture: 'Culture',
    news: 'Actualités',
    live: 'En Direct',
    login: 'Se connecter',
    back: 'Retour',
    changeLanguage: 'Changer de langue',
    darkMode: 'Mode sombre',
    profile: 'Profil',
    logout: 'Déconnexion',

    // Hero Section
    welcomeToLionix: 'Bienvenue sur Lionix',
    exploreContent: 'Explorez un monde de contenu sportif et culturel adapté à vos intérêts.',
    discoverSubscriptions: 'Découvrir les Abonnements',

    // Subscription Plans
    subscriptionPlans: 'Plans d\'Abonnement',
    classic: 'Classique',
    premium: 'Premium',
    vip: 'VIP',
    perMonth: '/mois',
    subscribe: 'S\'abonner',
    basicSportsAccess: 'Accès au contenu sportif de base',
    limitedCulturalContent: 'Contenu culturel limité',
    standardVideoQuality: 'Qualité vidéo standard',
    premiumSportsAccess: 'Accès au contenu sportif premium',
    extendedCulturalContent: 'Contenu culturel étendu',
    hdVideoQuality: 'Qualité vidéo HD',
    exclusiveInterviews: 'Interviews exclusives',
    fullContentAccess: 'Accès complet à tout le contenu sportif et culturel',
    fourKVideoQuality: 'Qualité vidéo 4K',
    vipEvents: 'Événements VIP',
    personalizedRecommendations: 'Recommandations personnalisées',
    chooseYourPlan: 'Choisissez votre plan',
    payNow: 'Payer maintenant',
    cardNumber: 'Numéro de carte',
    enterCardNumber: 'Entrez le numéro de carte',
    expiryDate: 'Date d\'expiration',
    cvv: 'CVV',
    confirmPayment: 'Confirmer le paiement',
    allClassicFeatures: 'Toutes les fonctionnalités Classique',
    adFreeViewing: 'Visionnage sans publicité',
    downloadableContent: 'Contenu téléchargeable',
    allPremiumFeatures: 'Toutes les fonctionnalités Premium',
    fourKStreaming: 'Streaming 4K',
    earlyAccessToContent: 'Accès anticipé au contenu',
    accessAllSports: 'Accès à tout le contenu sportif',
    liveGameStreaming: 'Streaming des matchs en direct',

    // Cultural Heritage
    culturalHeritage: 'Héritage Culturel',
    discoverYourOrigins: 'Découvrez Vos Origines',
    exploreAfricanCulture: 'Explorez la riche tapisserie de la culture africaine, de ses traditions vibrantes à son impact profond sur l\'héritage mondial.',
    africanOrigins: 'Origines Africaines',
    africanCultureDescription: 'Plongez au cœur de la culture africaine, où les traditions ancestrales rencontrent les expressions modernes. Découvrez les rythmes vibrants, les histoires captivantes et la brillance artistique qui ont façonné les civilisations à travers le monde. Notre contenu sélectionné vous rapproche de l\'essence de ce riche héritage, offrant une perspective unique sur son legs durable.',

    // Footer
    about: 'À Propos',
    contact: 'Contact',
    termsOfUse: 'Conditions d\'Utilisation',
    privacyPolicy: 'Politique de Confidentialité',
    allRightsReserved: '© 2025 Lionix. Tous droits réservés.',

    // Login Page - Base
    signup: 'S\'inscrire',
    accessYourAccount: 'Accédez à votre compte Lionix',
    createYourAccount: 'Créez votre compte Lionix',
    emailAddress: 'Adresse email',
    enterYourEmail: 'Entrez votre email',
    password: 'Mot de passe',
    enterYourPassword: 'Entrez votre mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    confirmYourPassword: 'Confirmez votre mot de passe',
    noAccountYet: 'Pas encore de compte ?',
    alreadyHaveAccount: 'Déjà un compte ?',

    // Login Page - Athlete Form
    signupAthlete: 'Inscription Athlète',
    createAthleteAccount: 'Créez votre compte athlète Lionix',
    username: 'Nom d\'utilisateur',
    enterUsername: 'Entrez votre nom d\'utilisateur',
    phoneNumber: 'Numéro de téléphone',
    enterPhoneNumber: 'Entrez votre numéro',
    countryOfResidence: 'Pays de résidence',
    sportDiscipline: 'Discipline sportive',
    selectCountry: 'Sélectionnez un pays',
    selectSport: 'Sélectionnez un sport',
    searchCountry: 'Rechercher un pays...',
    searchSport: 'Rechercher un sport...',
    createAccount: 'Créer le compte',

    // OTP Verification
    otpTitle: 'Vérifiez votre email',
    otpMessage: 'Nous avons envoyé un code de vérification à votre adresse email. Veuillez le saisir ci-dessous pour finaliser votre inscription.',
    otpInputLabel: 'Code de vérification',
    otpPlaceholder: 'Entrez le code à 6 chiffres',
    otpSubmitButton: 'Vérifier et se connecter',
    otpInvalid: 'Code de vérification invalide ou expiré.',
    otpSuccess: 'Vérification réussie ! Connexion...',
    resendOtp: 'Renvoyer le code',
    resendOtpSuccess: 'Un nouveau code a été envoyé.',
    resendOtpError: 'Erreur lors du renvoi du code.',
    resendOtpCooldown: 'Vous pouvez renvoyer le code dans {{seconds}}s.',

    // Validation Messages
    emailRequired: 'L\'email est obligatoire',
    invalidEmail: 'Format d\'email invalide',
    passwordRequired: 'Le mot de passe est obligatoire',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
    confirmPasswordRequired: 'La confirmation du mot de passe est obligatoire',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
    usernameRequired: 'Le nom d\'utilisateur est obligatoire',
    usernameTooShort: 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
    phoneRequired: 'Le numéro de téléphone est obligatoire',
    sportRequired: 'La discipline sportive est obligatoire',
    otpRequired: 'Le code de vérification est obligatoire',

    // Success/Error Messages
    loginSuccess: 'Connexion réussie ! Redirection...',
    loginError: 'Email ou mot de passe incorrect',
    signupSuccess: 'Compte créé ! Veuillez vérifier votre email.',
    signupError: 'Erreur lors de la création du compte',
    emailAlreadyExists: 'Cet email est déjà utilisé',
    profileCreationError: 'Erreur lors de la création du profil',
    unexpectedError: 'Une erreur inattendue s\'est produite',
    logoutError: 'Erreur lors de la déconnexion',
    profileUpdatedSuccess: 'Profil mis à jour avec succès !',
    profileUpdatedError: 'Erreur lors de la mise à jour du profil.',

    // Profile Page
    myProfile: 'Mon Profil',
    editProfile: 'Modifier le profil',
    profileInfo: 'Informations du profil',
    loadingProfile: 'Chargement du profil...',
    errorLoadingProfile: 'Erreur lors du chargement du profil.',
    save: 'Enregistrer',
    cancel: 'Annuler',
    memberSince: 'Membre depuis {{year}}',
    subscriptions: 'Abonnements',
    calendar: 'Calendrier',
    vipZone: 'Zone VIP',
    upgrade: 'Mettre à niveau',
    help: 'Aide',
    helloUser: 'Bonjour, {{name}} !',
    activeSubscription: 'Abonnement Actif',
    premiumPlan: 'Plan Premium',
    changePlan: 'Changer de Plan',
    explore: 'Explorer',
    exclusiveContent: 'Contenu et expériences exclusifs',
    upcomingEvents: 'Événements et calendriers à venir',
    viewCalendar: 'Voir le Calendrier',
    myAccount: 'Mon Compte',
    
    // Calendar Page
    addToGoogleCalendar: 'Ajouter à Google Agenda',
    scheduleAppointment: 'Prendre rendez-vous',
    selectDatePrompt: 'Sélectionnez une date dans le calendrier pour prendre rendez-vous.',
    appointmentForDate: 'Rendez-vous pour le {{date}}',
    eventType: "Type d'événement",
    dateRange: "Plage de dates",

    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية'
  },
  en: {
    // Navigation
    home: 'Home',
    sports: 'Sports',
    culture: 'Culture',
    news: 'News',
    live: 'Live',
    login: 'Log In',
    back: 'Back',
    changeLanguage: 'Change language',
    darkMode: 'Dark mode',
    profile: 'Profile',
    logout: 'Logout',

    // Hero Section
    welcomeToLionix: 'Welcome to Lionix',
    exploreContent: 'Explore a world of sports and cultural content tailored to your interests.',
    discoverSubscriptions: 'Discover Subscriptions',

    // Subscription Plans
    subscriptionPlans: 'Subscription Plans',
    classic: 'Classic',
    premium: 'Premium',
    vip: 'VIP',
    perMonth: '/month',
    subscribe: 'Subscribe',
    basicSportsAccess: 'Access to basic sports content',
    limitedCulturalContent: 'Limited cultural content',
    standardVideoQuality: 'Standard video quality',
    premiumSportsAccess: 'Access to premium sports content',
    extendedCulturalContent: 'Extended cultural content',
    hdVideoQuality: 'HD video quality',
    exclusiveInterviews: 'Exclusive interviews',
    fullContentAccess: 'Full access to all sports and cultural content',
    fourKVideoQuality: '4K video quality',
    vipEvents: 'VIP events',
    personalizedRecommendations: 'Personalized recommendations',
    chooseYourPlan: 'Choose your plan',
    payNow: 'Pay Now',
    cardNumber: 'Card Number',
    enterCardNumber: 'Enter card number',
    expiryDate: 'Expiry Date',
    cvv: 'CVV',
    confirmPayment: 'Confirm Payment',
    allClassicFeatures: 'All Classic features',
    adFreeViewing: 'Ad-free viewing',
    downloadableContent: 'Downloadable content',
    allPremiumFeatures: 'All Premium features',
    fourKStreaming: '4K streaming',
    earlyAccessToContent: 'Early access to content',
    accessAllSports: 'Access to all sports content',
    liveGameStreaming: 'Live game streaming',

    // Cultural Heritage
    culturalHeritage: 'Cultural Heritage',
    discoverYourOrigins: 'Discover Your Origins',
    exploreAfricanCulture: 'Explore the rich tapestry of African culture, from its vibrant traditions to its profound impact on global heritage.',
    africanOrigins: 'African Origins',
    africanCultureDescription: 'Dive into the heart of African culture, where ancestral traditions meet modern expressions. Discover vibrant rhythms, captivating stories, and artistic brilliance that have shaped civilizations around the world. Our curated content brings you closer to the essence of this rich heritage, offering a unique perspective on its lasting legacy.',

    // Footer
    about: 'About',
    contact: 'Contact',
    termsOfUse: 'Terms of Use',
    privacyPolicy: 'Privacy Policy',
    allRightsReserved: '© 2025 Lionix. All rights reserved.',

    // Login Page - Base
    signup: 'Sign Up',
    accessYourAccount: 'Access your Lionix account',
    createYourAccount: 'Create your Lionix account',
    emailAddress: 'Email address',
    enterYourEmail: 'Enter your email',
    password: 'Password',
    enterYourPassword: 'Enter your password',
    confirmPassword: 'Confirm password',
    confirmYourPassword: 'Confirm your password',
    noAccountYet: 'No account yet?',
    alreadyHaveAccount: 'Already have an account?',

    // Login Page - Athlete Form
    signupAthlete: 'Athlete Signup',
    createAthleteAccount: 'Create your Lionix athlete account',
    username: 'Username',
    enterUsername: 'Enter your username',
    phoneNumber: 'Phone number',
    enterPhoneNumber: 'Enter your number',
    countryOfResidence: 'Country of residence',
    sportDiscipline: 'Sport discipline',
    selectCountry: 'Select a country',
    selectSport: 'Select a sport',
    searchCountry: 'Search country...',
    searchSport: 'Search sport...',
    createAccount: 'Create Account',

    // OTP Verification
    otpTitle: 'Verify Your Email',
    otpMessage: 'We have sent a verification code to your email address. Please enter it below to complete your registration.',
    otpInputLabel: 'Verification Code',
    otpPlaceholder: 'Enter the 6-digit code',
    otpSubmitButton: 'Verify & Log In',
    otpInvalid: 'Invalid or expired verification code.',
    otpSuccess: 'Verification successful! Logging in...',
    resendOtp: 'Resend code',
    resendOtpSuccess: 'A new code has been sent.',
    resendOtpError: 'Error resending code.',
    resendOtpCooldown: 'You can resend the code in {{seconds}}s.',

    // Validation Messages
    emailRequired: 'Email is required',
    invalidEmail: 'Invalid email format',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters',
    confirmPasswordRequired: 'Password confirmation is required',
    passwordsDoNotMatch: 'Passwords do not match',
    usernameRequired: 'Username is required',
    usernameTooShort: 'Username must be at least 3 characters',
    phoneRequired: 'Phone number is required',
    sportRequired: 'Sport discipline is required',
    otpRequired: 'Verification code is required',

    // Success/Error Messages
    loginSuccess: 'Login successful! Redirecting...',
    loginError: 'Incorrect email or password',
    signupSuccess: 'Account created! Please check your email.',
    signupError: 'Error creating account',
    emailAlreadyExists: 'This email is already in use',
    profileCreationError: 'Error creating profile',
    unexpectedError: 'An unexpected error occurred',
    logoutError: 'Error logging out',
    profileUpdatedSuccess: 'Profile updated successfully!',
    profileUpdatedError: 'Error updating profile.',

    // Profile Page
    myProfile: 'My Profile',
    editProfile: 'Edit Profile',
    profileInfo: 'Profile Information',
    loadingProfile: 'Loading profile...',
    errorLoadingProfile: 'Error loading profile.',
    save: 'Save',
    cancel: 'Cancel',
    memberSince: 'Member since {{year}}',
    subscriptions: 'Subscriptions',
    calendar: 'Calendar',
    vipZone: 'VIP Zone',
    upgrade: 'Upgrade',
    help: 'Help',
    helloUser: 'Hello, {{name}}!',
    activeSubscription: 'Active Subscription',
    premiumPlan: 'Premium Plan',
    changePlan: 'Change Plan',
    explore: 'Explore',
    exclusiveContent: 'Exclusive content and experiences',
    upcomingEvents: 'Upcoming events and schedules',
    viewCalendar: 'View Calendar',
    myAccount: 'My Account',

    // Calendar Page
    addToGoogleCalendar: 'Add to Google Calendar',
    scheduleAppointment: 'Schedule Appointment',
    selectDatePrompt: 'Select a date from the calendar to schedule an appointment.',
    appointmentForDate: 'Appointment for {{date}}',
    eventType: "Event Type",
    dateRange: "Date Range",

    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    sports: 'الرياضة',
    culture: 'الثقافة',
    news: 'الأخبار',
    live: 'بث مباشر',
    login: 'تسجيل الدخول',
    back: 'العودة',
    changeLanguage: 'تغيير اللغة',
    darkMode: 'الوضع المظلم',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',

    // Hero Section
    welcomeToLionix: 'مرحباً بكم في ليونيكس',
    exploreContent: 'استكشف عالماً من المحتوى الرياضي والثقافي المصمم خصيصاً لاهتماماتك.',
    discoverSubscriptions: 'اكتشف الاشتراكات',

    // Subscription Plans
    subscriptionPlans: 'خطط الاشتراك',
    classic: 'كلاسيكي',
    premium: 'مميز',
    vip: 'في آي بي',
    perMonth: '/شهر',
    subscribe: 'اشترك',
    basicSportsAccess: 'الوصول إلى المحتوى الرياضي الأساسي',
    limitedCulturalContent: 'محتوى ثقافي محدود',
    standardVideoQuality: 'جودة فيديو قياسية',
    premiumSportsAccess: 'الوصول إلى المحتوى الرياضي المميز',
    extendedCulturalContent: 'محتوى ثقافي موسع',
    hdVideoQuality: 'جودة فيديو عالية الوضوح',
    exclusiveInterviews: 'مقابلات حصرية',
    fullContentAccess: 'وصول كامل لجميع المحتوى الرياضي والثقافي',
    fourKVideoQuality: 'جودة فيديو 4K',
    vipEvents: 'فعاليات في آي بي',
    personalizedRecommendations: 'توصيات شخصية',
    chooseYourPlan: 'اختر خطتك',
    payNow: 'ادفع الآن',
    cardNumber: 'رقم البطاقة',
    enterCardNumber: 'أدخل رقم البطاقة',
    expiryDate: 'تاريخ انتهاء الصلاحية',
    cvv: 'CVV',
    confirmPayment: 'تأكيد الدفع',
    allClassicFeatures: 'جميع ميزات الكلاسيك',
    adFreeViewing: 'مشاهدة بدون إعلانات',
    downloadableContent: 'محتوى قابل للتنزيل',
    allPremiumFeatures: 'جميع ميزات البريميوم',
    fourKStreaming: 'بث 4K',
    earlyAccessToContent: 'الوصول المبكر للمحتوى',
    accessAllSports: 'الوصول إلى كل المحتوى الرياضي',
    liveGameStreaming: 'بث مباشر للمباريات',

    // Cultural Heritage
    culturalHeritage: 'التراث الثقافي',
    discoverYourOrigins: 'اكتشف أصولك',
    exploreAfricanCulture: 'استكشف النسيج الغني للثقافة الأفريقية، من تقاليدها النابضة بالحياة إلى تأثيرها العميق على التراث العالمي.',
    africanOrigins: 'الأصول الأفريقية',
    africanCultureDescription: 'انغمس في قلب الثقافة الأفريقية، حيث تلتقي التقاليد الأجدادية بالتعبيرات الحديثة. اكتشف الإيقاعات النابضة بالحياة والقصص الآسرة والتألق الفني الذي شكل الحضارات حول العالم. يقربك محتوانا المنتقى من جوهر هذا التراث الغني، ويقدم منظوراً فريداً حول إرثه الدائم.',

    // Footer
    about: 'حول',
    contact: 'اتصل بنا',
    termsOfUse: 'شروط الاستخدام',
    privacyPolicy: 'سياسة الخصوصية',
    allRightsReserved: '© 2025 ليونيكس. جميع الحقوق محفوظة.',

    // Login Page - Base
    signup: 'التسجيل',
    accessYourAccount: 'الوصول إلى حساب ليونيكس الخاص بك',
    createYourAccount: 'إنشاء حساب ليونيكس الخاص بك',
    emailAddress: 'عنوان البريد الإلكتروني',
    enterYourEmail: 'أدخل بريدك الإلكتروني',
    password: 'كلمة المرور',
    enterYourPassword: 'أدخل كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    confirmYourPassword: 'أكد كلمة المرور',
    noAccountYet: 'لا يوجد حساب بعد؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',

    // Login Page - Athlete Form
    signupAthlete: 'تسجيل الرياضيين',
    createAthleteAccount: 'إنشاء حساب رياضي في ليونيكس',
    username: 'اسم المستخدم',
    enterUsername: 'أدخل اسم المستخدم',
    phoneNumber: 'رقم الهاتف',
    enterPhoneNumber: 'أدخل رقمك',
    countryOfResidence: 'بلد الإقامة',
    sportDiscipline: 'التخصص الرياضي',
    selectCountry: 'اختر بلداً',
    selectSport: 'اختر رياضة',
    searchCountry: 'البحث عن بلد...',
    searchSport: 'البحث عن رياضة...',
    createAccount: 'إنشاء الحساب',
    
    // OTP Verification
    otpTitle: 'تحقق من بريدك الإلكتروني',
    otpMessage: 'لقد أرسلنا رمز تحقق إلى عنوان بريدك الإلكتروني. يرجى إدخاله أدناه لإكمال تسجيلك.',
    otpInputLabel: 'رمز التحقق',
    otpPlaceholder: 'أدخل الرمز المكون من 6 أرقام',
    otpSubmitButton: 'تحقق وسجل الدخول',
    otpInvalid: 'رمز التحقق غير صالح أو منتهي الصلاحية.',
    otpSuccess: 'نجح التحقق! جاري تسجيل الدخول...',
    resendOtp: 'إعادة إرسال الرمز',
    resendOtpSuccess: 'تم إرسال رمز جديد.',
    resendOtpError: 'خطأ في إعادة إرسال الرمز.',
    resendOtpCooldown: 'يمكنك إعادة إرسال الرمز خلال {{seconds}} ثانية.',

    // Validation Messages
    emailRequired: 'البريد الإلكتروني مطلوب',
    invalidEmail: 'تنسيق البريد الإلكتروني غير صحيح',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    confirmPasswordRequired: 'تأكيد كلمة المرور مطلوب',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    usernameRequired: 'اسم المستخدم مطلوب',
    usernameTooShort: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل',
    phoneRequired: 'رقم الهاتف مطلوب',
    sportRequired: 'التخصص الرياضي مطلوب',
    otpRequired: 'رمز التحقق مطلوب',

    // Success/Error Messages
    loginSuccess: 'تم تسجيل الدخول بنجاح! جاري التوجيه...',
    loginError: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    signupSuccess: 'تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني.',
    signupError: 'خطأ في إنشاء الحساب',
    emailAlreadyExists: 'هذا البريد الإلكتروني مستخدم بالفعل',
    profileCreationError: 'خطأ في إنشاء الملف الشخصي',
    unexpectedError: 'حدث خطأ غير متوقع',
    logoutError: 'خطأ أثناء تسجيل الخروج',
    profileUpdatedSuccess: 'تم تحديث الملف الشخصي بنجاح!',
    profileUpdatedError: 'خطأ أثناء تحديث الملف الشخصي.',

    // Profile Page
    myProfile: 'ملفي الشخصي',
    editProfile: 'تعديل الملف الشخصي',
    profileInfo: 'معلومات الملف الشخصي',
    loadingProfile: 'جاري تحميل الملف الشخصي...',
    errorLoadingProfile: 'خطأ في تحميل الملف الشخصي.',
    save: 'حفظ',
    cancel: 'إلغاء',
    memberSince: 'عضو منذ {{year}}',
    subscriptions: 'الاشتراكات',
    calendar: 'التقويم',
    vipZone: 'منطقة VIP',
    upgrade: 'ترقية',
    help: 'مساعدة',
    helloUser: 'مرحباً، {{name}}!',
    activeSubscription: 'الاشتراك النشط',
    premiumPlan: 'الخطة المميزة',
    changePlan: 'تغيير الخطة',
    explore: 'استكشف',
    exclusiveContent: 'محتوى وتجارب حصرية',
    upcomingEvents: 'الأحداث والجداول القادمة',
    viewCalendar: 'عرض التقويم',
    myAccount: 'حسابي',

    // Calendar Page
    addToGoogleCalendar: 'إضافة إلى تقويم Google',
    scheduleAppointment: 'تحديد موعد',
    selectDatePrompt: 'اختر تاريخًا من التقويم لتحديد موعد.',
    appointmentForDate: 'موعد في {{date}}',
    eventType: "نوع الحدث",
    dateRange: "نطاق التاريخ",

    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('fr');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('lionix-language') as Language;
    if (savedLanguage && ['fr', 'en', 'ar'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('lionix-language', lang);
    document.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = translations[currentLanguage][key as keyof typeof translations['fr']] || key;
    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{{${paramKey}}}`, String(params[paramKey]));
      });
    }
    return translation;
  };

  const isRTL = currentLanguage === 'ar';

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

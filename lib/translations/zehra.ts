export const translations = {
  en: {
    // Page metadata
    title:
      "Zehra is Missing · Detective Experience · Interactive Crime Solving Game",
    description:
      "Solve thrilling crime puzzles, test your detective skills. Perfect for family fun and strategic gameplay!",
    keywords:
      "crime solving game, detective game, board game, mystery, adventure, puzzle, family game, strategic game, English",

    // Navigation and main page
    gameTitle: "Zehra is Missing",
    gamePdf: "Game PDF (EN)",
    pdfLink:
      "https://docs.google.com/document/d/1JBYExCLctOVK-Qj3HjQPWZglMmt8dP4IZY7BTwEwOl0/edit?usp=sharing",
    gameDescription: "A Mystery Game: Zehra is Missing",

    // Main sections
    chestPuzzle: {
      title: "1. A chest found in Zehra's room",
      description: "Our experts think the password is something Zehra loved.",
      label: "Chest password",
      placeholder: "XXXXXXXXX",
      hint: "Read the aunt's statement carefully",
      solution: "Password: cinderella",
    },

    hiddenMessages: {
      title: "2. Phone records",
      description:
        "Our agents managed to capture data from some people's phone messages. To access them, you need to find the password for each messaging app.",
      phoneLabels: {
        zehra: "Zehra's phone",
        mahmut: "Mahmut's phone",
        semra: "Semra's phone",
        kerim: "Kerim's phone",
        riza: "Riza's phone",
      },
      cantFindPasswords: "Can't find the phone passwords?",
      hints: [
        {
          name: "Zehra",
          help: "Were you able to open Zehra's chest?",
          solution: "Password: 1397",
        },
        {
          name: "Mahmut",
          help: "Mahmut seems to be a passionate Fenerbahçe fan.",
          solution: "Password: 1907",
        },
        {
          name: "Kerim",
          help: "What year did Kerim and Zehra meet?",
          solution: "Password: 2001",
        },
        {
          name: "Semra",
          help:
            "Have you looked at the books Semra reads? She seems to enjoy reading George Orwell",
          solution: "Password: 1984",
        },
        {
          name: "Riza",
          help:
            "Riza seems obsessed with Count Dracula. Could the password be related to him?",
          solution: "Password: 1431",
        },
      ],
    },

    cameraReport: {
      title:
        "3. Details we received about the accident in front of Mahmut's shop",
      description:
        "Our agent forgot to give his password when he went on sick leave. He's very good at hiding his passwords, maybe his board can help you.",
      label: "Camera footage",
      placeholder: "XXXXXXX",
      hint:
        "Did you read the newspaper article carefully? It seems a bit different from the original...",
      solution: "Password: Cesme",
    },

    finalChat: {
      title: "I'm ready to make an accusation",
      confirmDialog:
        "Are you sure you want to continue? You will reach the finale of the story and learn the result.",
      systemMessage: "Person is offline...",
    },

    finalDecision: {
      title: "Game End Survey",
      submitSuccess: "Your answers have been submitted successfully!",
      submit: "Submit",
      questions: {
        initialConclusion:
          "What conclusion did you reach first as a result of your research?",
        responsible:
          "At First, who did you think is responsible for Zehra's disappearance?",
        carAccident: "Who caused the car accident?",
        hospitalReason: "Why did Zehra go to the hospital?",
        finalAction: "What would you do after the last conversation?",
      },
      options: {
        killed: "Zehra was killed",
        kidnapped: "Zehra was kidnapped",
        suicide: "Zehra committed suicide",
        escapedAlone: "Zehra escaped alone",
        none: "No one/she did it on her own",
        other: "Someone else",
        bloodSugar: "Low blood sugar",
        kidneyFailure: "Kidney failure",
        panic: "Panic attack",
        miscarriage: "Miscarriage",
        cancer: "Cancer",
        allergy: "Allergy",
        sprain: "Sprain",
        asthma: "Asthma attack",
        unknown: "Unknown reason",
        didntGo: "Actually didn't go to hospital",
        keepSecret:
          "Keep Zehra's escape to yourself. Mahmut will continue to stay in prison, Zehra will continue to live in hiding.",
        goToPolice:
          "Go to the police with the last evidence in your hand. Nedim and Semra will be arrested for misleading the police, Mahmut will be released.",
      },
      results: {
        title: "Survey Results",
        totalResponses: "Total responses:",
        yourAnswers: "Your Answers",
        retake: "Retake Survey",
      },
      loading: "Loading...",
      validation: {
        required: "Please fill in all required fields.",
      },
    },

    // Common UI elements
    buttons: {
      open: "Open",
      getHint: "Get Hint",
      showAnswer: "Show Answer",
      close: "Close",
    },

    // Chat UI
    chat: {
      messages: "Messages",
      detective: "Detective",
    },

    // Hints Modal
    hints: {
      buttonText: "HINTS",
      modalTitle: "CASE FILES DATABASE",
      fileNumber: "FILE #",
      evidence: "Evidence",
      status: "Status",
      statusClassified: "Classified",
      hintButton: "HINT",
      answerButton: "ANSWER",
      confidentialAccess: "CONFIDENTIAL DATABASE ACCESS",
      names: {
        chest: "Chest",
        corkBoard: "Cork Board",
        phoneZehra: "Phone: Zehra",
        phoneMahmut: "Phone: Mahmut",
        phoneKerim: "Phone: Kerim",
        phoneSemra: "Phone: Semra",
        phoneRiza: "Phone: Riza",
      },
    },

    // Phone UI
    phone: {
      closeButton: "Close phone",
      ownerPhone: "'s Phone",
    },

    // Game terminal messages
    terminal: {
      evidenceDB: "EVIDENCE_DB.exe",
      zehraChest: "Zehra_CHEST.exe",
      accusation: "ACCUSATION.exe",
      analyzingEvidence: "analyzing evidence board...",
      patternRecognition: "pattern recognition activated",
      enterKeyword: "enter the keyword:",
      fieldAgent: "field agent waiting with chest access",
      chestLock: "chest has a lock, need the chest password",
      sendPassword: "send the chest password:",
      finalDecision: "FINAL DECISION",
      accessButton: "ACCESS",
      errorInvalid: "ERROR: Invalid passphrase.",
      errorLock: "AGENT: Lock didn't open.",
      deepScanActive: "DEEP SCAN > ACTIVE",
      connectionSecure: "CONNECTION > SECURE",
      initiateScan: "initiate deep scan on zehra's personal items",
      scanComplete: "scan complete. items indexed:",
      personaFile: "persona.exe > CORRUPTED",
      memoryTrace: "memory_trace.dat > FOUND",
      location: "location.bat > ACTIVE",
      generateAccusation: "generate accusation.bat file",
      compiling: "compiling evidence...",
      crossReference: "cross-referencing timeline...",
      verdict: "verdict.exe > READY TO EXECUTE",
    },

    messages: {
      wrongPassword: "Wrong password",
      confirmHint: "Are you sure you want to get a hint?",
      confirmSolution: "Are you sure you want to learn the answer?",
    },

    // Lock screen texts
    lockTexts: {
      kerim: "When I first saw her <3",
      riza: "M'lord",
    },

    // Language toggle
    language: {
      english: "English",
      turkish: "Türkçe",
      switchTo: "Switch to",
    },
  },

  tr: {
    // Page metadata
    title:
      "Zehra Kayıp · Dedektiflik Deneyimi · Senaryo Tabanlı Sürükleyici Oyunlar",
    description:
      "Gerilim dolu suç çözme oyunuyla sırları çözün, dedektif yeteneklerinizi sınayın. Aile eğlencesi ve stratejik oyun için mükemmel bir deneyim!",
    keywords:
      "suç çözme oyunu, dedektif oyunu, masa oyunu, gizem, macera, bulmaca, aile oyunu, stratejik oyun, masa oyunu, Türkçe",

    // Navigation and main page
    gameTitle: "Zehra Kayıp",
    gamePdf: "Oyun PDF (TR)",
    pdfLink:
      "https://docs.google.com/document/d/1XYFz_e6lnMz52nTBZoX5tLlucA_K2idL-6nOsze4hU0/edit?usp=sharing",
    gameDescription: "Bir Gizem Oyunu: Zehra Kayıp",

    // Main sections
    chestPuzzle: {
      title: "1. Zehra'nın odasında bulunan bir sandık",
      description:
        "Uzmanlarımız şifrenin, Zehra'nın sevdiği bir şey olduğnu düşünüyor.",
      label: "Sandık şifresi",
      placeholder: "XXXXXXXXX",
      hint: "Teyzesinin ifadesini dikkatli okuyun",
      solution: "Şifre: külkedisi",
    },

    hiddenMessages: {
      title: "2. Telefon kayıtları",
      description:
        "Ajanlarımız bazı kişilerin telefonlarındaki mesajların datasını yakalamayı başardı. Onlara ulaşabilmek için mesaj uygulamasının şifresini bulman gerekiyor.",
      phoneLabels: {
        zehra: "Zehra'nın telefonu",
        mahmut: "Mahmut'un telefonu",
        semra: "Semra'nın telefonu",
        kerim: "Kerim'in telefonu",
        riza: "Rıza'nın telefonu",
      },
      cantFindPasswords: "Telefon şifrelerini bulamadınız mı?",
      hints: [
        {
          name: "Zehra",
          help: "Zehra'nın sandığını açabildin mi?",
          solution: "Şifre: 1397",
        },
        {
          name: "Mahmut",
          help: "Mahmut sıkı bir Fenerbahçe hayranı gibi duruyor.",
          solution: "Şifre: 1907",
        },
        {
          name: "Kerim",
          help: "Kerim ile Zehra hangi yılda tanıştılar?",
          solution: "Şifre: 2001",
        },
        {
          name: "Semra",
          help:
            "Semra'nın okuduğu kitaplara bakabildin mi? George Orwell okumayı seviyor gibi",
          solution: "Şifre: 1984",
        },
        {
          name: "Riza",
          help:
            "Rıza, Kont Dracula'ya kafayı takmış gibi. Şifre onunla ilgili bir şey olabilir mi?",
          solution: "Şifre: 1431",
        },
      ],
    },

    cameraReport: {
      title:
        "3. Mahmut'un dükkanı önünde yaşanan kaza hakkında aldığımız detaylar",
      description:
        "Ajanımız hastalık iznine çıkarken şifresini vermeyi unutmuş. Şifrelerini gizlemeyi çok iyi bilir, belki panosu sana yardımcı olur.",
      label: "Kamera görüntüleri",
      placeholder: "XXXXXXX",
      hint:
        "Gazete haberini dikkatli okudunuz mu? Orijinal haberden biraz farklı gibi...",
      solution: "Şifre: Çeşme",
    },

    finalChat: {
      title: "Suçlama yapmaya hazırım",
      confirmDialog:
        "Devam etmek istediğinize emin misiniz? Hikayenin finaline gelecek ve sonucu öğreneceksiniz.",
      systemMessage: "Kişi çevirimdışı...",
    },

    finalDecision: {
      title: "Oyun sonu anketi",
      submitSuccess: "Cevaplarınız başarıyla gönderildi!",
      submit: "Gönder",
      questions: {
        initialConclusion:
          "Araştırmalarınız sonucu ilk hangi sonuca ulaşmıştınız?",
        responsible:
          "İlk tahmininizde, Zehra'nın kaybolmasından kim/kimler sorumlu olduğunu düşündünüz?",
        carAccident: "Araba kazasını kim yaptı?",
        hospitalReason: "Zehra neden hastaneye gitti?",
        finalAction: "Son konuşmadan sonra ne yapacaksın?",
      },
      options: {
        killed: "Zehra öldürüldü",
        kidnapped: "Zehra kaçırıldı",
        suicide: "Zehra intihar etti",
        escapedAlone: "Zehra tek başına kaçtı",
        none: "Hiçkimse/Kendi başına yaptı",
        other: "Başka biri",
        bloodSugar: "Şekeri düşmesi",
        kidneyFailure: "Böbrek yetmezliği",
        panic: "Panik atak",
        miscarriage: "Düşük",
        cancer: "Kanser",
        allergy: "Alerji",
        sprain: "Burkulma",
        asthma: "Astım krizi",
        unknown: "Nedeni bilinmiyor",
        didntGo: "Aslında hastaneye gitmedi",
        keepSecret:
          "Zehra'nın kaçtığını kendine sakla. Mahmut hapiste kalmaya devam edecek, Zehra kayıplarda yaşamaya devam edecek.",
        goToPolice:
          "Elindeki son kanıtlarla polise git. Nedim ve Semra polisi yanlış yönlendirmeden tutuklanacak, Mahmut serbest kalacak.",
      },
      results: {
        title: "Anket Sonuçları",
        totalResponses: "Toplam yanıt:",
        yourAnswers: "Verdiğiniz Cevaplar",
        retake: "Anketi Yeniden Çöz",
      },
      loading: "Yükleniyor...",
      validation: {
        required: "Lütfen tüm gerekli alanları doldurun.",
      },
    },

    // Common UI elements
    buttons: {
      open: "Aç",
      getHint: "İpucu Al",
      showAnswer: "Cevabı göster",
      close: "Kapat",
    },

    // Chat UI
    chat: {
      messages: "Mesajlarım",
      detective: "Dedektif",
    },

    // Hints Modal
    hints: {
      buttonText: "İPUÇLARI",
      modalTitle: "DAVA DOSYALARI VERİTABANI",
      fileNumber: "DOSYA #",
      evidence: "Delil",
      status: "Durum",
      statusClassified: "Gizli",
      hintButton: "İPUCU",
      answerButton: "CEVAP",
      confidentialAccess: "GİZLİ VERİTABANI ERİŞİMİ",
      names: {
        chest: "Sandık",
        corkBoard: "Mantar Pano",
        phoneZehra: "Telefon: Zehra",
        phoneMahmut: "Telefon: Mahmut",
        phoneKerim: "Telefon: Kerim",
        phoneSemra: "Telefon: Semra",
        phoneRiza: "Telefon: Rıza",
      },
    },

    // Phone UI
    phone: {
      closeButton: "Telefonu kapat",
      ownerPhone: ", Telefon",
    },

    // Game terminal messages
    terminal: {
      evidenceDB: "DELİL_VT.exe",
      zehraChest: "Zehra_SANDIK.exe",
      accusation: "SUÇLAMA.exe",
      analyzingEvidence: "delil panosu analiz ediliyor...",
      patternRecognition: "desen tanıma sistemi aktif",
      enterKeyword: "anahtar kelimeyi girin:",
      fieldAgent: "saha ajanı sandık erişimi için bekliyor",
      chestLock: "sandıkta kilit var, sandık şifresi gerekiyor",
      sendPassword: "sandık şifresini gönderin:",
      finalDecision: "FINAL KARAR",
      accessButton: "ERİŞ",
      errorInvalid: "HATA: Geçersiz şifre.",
      errorLock: "AJAN: Kilit açılmadı.",
      deepScanActive: "DERİN TARAMA > AKTİF",
      connectionSecure: "BAĞLANTI > GÜVENLİ",
      initiateScan: "zehra'nın kişisel eşyalarında derin tarama başlat",
      scanComplete: "tarama tamamlandı. öğeler indekslendi:",
      personaFile: "persona.exe > BOZUK",
      memoryTrace: "hafıza_izi.dat > BULUNDU",
      location: "konum.bat > AKTİF",
      generateAccusation: "suçlama.bat dosyası oluştur",
      compiling: "deliller derleniyor...",
      crossReference: "zaman çizelgesi çapraz referans...",
      verdict: "karar.exe > YÜRÜTMEYE HAZIR",
    },

    messages: {
      wrongPassword: "Yanlış şifre",
      confirmHint: "İpucu almak istediğinize emin misiniz?",
      confirmSolution: "Cevabı öğrenmek istediğinize emin misiniz?",
    },

    // Lock screen texts
    lockTexts: {
      kerim: "Onu ilk gördüğüm zaman <3",
      riza: "M'lord",
    },

    // Language toggle
    language: {
      english: "English",
      turkish: "Türkçe",
      switchTo: "Geç",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type Language = keyof typeof translations;

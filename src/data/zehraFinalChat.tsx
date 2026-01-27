import { Message, Suspect, Decision, ResultType } from "../types/game";

import { getFinalAnswerEn, getFinalSentencesEn } from "./zehraFinalChatEn";

export const getFinalSentences = (
  person: Suspect,
  language: string = "tr",
): Decision[] => {
  if (language === "en") {
    return getFinalSentencesEn(person);
  }

  if (person === Suspect.ZEHRA) {
    return [
      {
        type: ResultType.ESCAPED,
        message:
          "Belki bu satırları hiç okumayacaksın ama kaçtığını biliyorum Zehra.",
      },
      {
        type: ResultType.SUICIDE,
        message: "Bunu yazmak çok anlamsız... İntihar ettiğini biliyorum.",
      },
    ];
  }

  return [
    {
      type: ResultType.KILLED,
      message: "Zehra'yı senin öldürdüğünü biliyorum.",
    },
    {
      type: ResultType.KIDNAPPED,
      message:
        "Zehra'nın kaybolmasında parmağın olduğunu biliyorum. Onu sen kaçırdın.",
    },
  ];
};

export const getFinalAnswer = (
  person: Suspect,
  finalDesision: Decision,
  language: string = "tr",
): Message[] => {
  if (language === "en") {
    return getFinalAnswerEn(person, finalDesision);
  }
  const getMessageTime = (minutes: number = 0) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60000); // Add minutes in milliseconds (1 minute = 60,000 milliseconds)

    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const initialMessage: Message[] = [];

  let result = initialMessage;

  if (person === Suspect.ZEHRA && finalDesision.type === ResultType.ESCAPED) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Merhaba dedektif...",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "Bu dosyayı çözmeye çalışanın bir tek sen olduğunu düşünmedin değil mi?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Secret Agent dedektifleri her yerde, ya bireysel ya da ekip halinde güvenlik güçlerinin gözden kaçırdığı her detayı inceliyor, adaleti yerine getirmek için mücadele ediyor.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Sana şunu söyleyebilirim ki Zehra ne yaptıysa kendi başına yapmadı...",
      },
    ]);
  } else if (
    person === Suspect.ZEHRA &&
    finalDesision.type === ResultType.SUICIDE
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Merhaba dedektif...",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "Bu dosyayı çözmeye çalışanın bir tek sen olduğunu düşünmedin değil mi?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Secret Agent dedektifleri her yerde, ya bireysel ya da ekip halinde güvenlik güçlerinin gözden kaçırdığı her detayı inceliyor, adaleti yerine getirmek için mücadele ediyor.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Sana şunu söyleyebilirim ki Zehra kendi başına da hareket etmedi, intihar da etmedi",
      },
    ]);
  } else if (
    (person === Suspect.SEMRA || person === Suspect.NEDIM) &&
    finalDesision.type === ResultType.KILLED
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Öldürmek mi? ÖLDÜRMEK Mİ?!",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "Bunu nasıl düşünebilirsin dedektif? Biz böyle bir şey yapacak insanlar mıyız?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Zehra'nın kılına zarar vermeyiz biz! O bugüne kadar çok şey yaşadı, çok zorluk çekti. Biz onu her hafta dinledik yanında olduk.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message: "Yaklaştın ama gerçeği bulamadın.",
      },
    ]);
  } else if (
    (person === Suspect.SEMRA || person === Suspect.NEDIM) &&
    finalDesision.type === ResultType.KIDNAPPED
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Ahhh, demek öyle?",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "Eninde sonunda gerçeklerin ortaya çıkacağını biliyorduk. Lütfen polise gitmeden önce bizi bir dinle, sonra ne yapacağına sen karar ver.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Zehra'yı haftalardır tanıyoruz, görüyoruz. Kendisi eve gelip giden birinden çok daha fazlası oldu bizim için. Ailemizden biri gibi oldu. Dışarıdan nasıl göründüğünü bilmem ama içinde hayat dolu, enerjik ve sevecen bir kadın yatıyor",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Zamanında babasının, şimdi de kocasının kendisine nasıl davrandığını anlattı bize. Sadece dinlerken bile o kadar üzüldük ki. Onlara rağmen yine de yüzü gülerdi, bizimle vakit geçirmekten çok keyif alırdı.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Geçen ay bize hamile olduğunu söylediğinde çok mutlu olduk. Hayatında yeni bir sayfa açmaya hazırlanıyordu.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Fakat bunu kocasına söyleyemeden işler değişti. Adam Zehra'nın telefonunu karıştırırken ona yazan birine denk geldi. İşte kıyamet orada koptu.",
      },
      {
        person: "other",
        time: getMessageTime(3),
        message:
          "Zehra'nın eski bir sevdiği varmış, ailesi izin vermediği için evlenememişler. Kocası onun Zehra'ya attığı mesajları görmüş. Adamın kan beynine sıçramış, kendisini kaybetmiş sinirden. Zehra bu adama hiç yüz vermemiş ve görüşmemiş olmasına rağmen kocası kadını her yeri mosmor olana kadar dövmüş.",
      },
      {
        person: "other",
        time: getMessageTime(3),
        message:
          "O yaraları, morlukları ne kadar kapatmaya çalışsa da biz gördük tabii. Zorla ağzından aldık lafı, her şeyi anlattı bize. Öyle bir ağladı ki görmeniz lazımdı, o güler yüzlü kadın birden yok oldu. Sonra birden fenalaştı bizim evde.",
      },
      {
        person: "other",
        time: getMessageTime(4),
        message:
          "Hemen acile götürdük, bekledik saatlerce. Sonra öğrendik ki düşük yapmış. O gün bizim için çok kötüydü ama asıl Zehra için cehennem gibiydi. Artık yaşamak istemediği belirten konuşmalar yapıyordu. Gözünün ışıltısı gitmişti.",
      },
      {
        person: "other",
        time: getMessageTime(4),
        message:
          "Bu böyle bitemezdi, Zehra için elimizden geleni yapmak zorundaydık. Daha önce de polise gitmeyi denemişti fakat kocasının tanıdıkları polise kadar uzanıyordu. O yüzden sonu hiç iyi olmamıştı bu denemelerinin.",
      },
      {
        person: "other",
        time: getMessageTime(5),
        message:
          "Zehra'yı kaçırmaya karar verdik. Kocasından, her şeyden uzakta yeni bir hayata başlaması, huzurlu bir yaşam sürmesi için elimizden geleni yapmaya karar verdik. Aileden kalan bağ evimizi ve biraz da para kullanarak gereken her şeyi ayarladık.",
      },
      {
        person: "other",
        time: getMessageTime(5),
        message:
          "Zehra güvendeydi ama o adam dışarıda onu ararken ne kadar güvende kalabilirdi. Kadıncağıza çektirdiklerinin onun yanına kar kalmasını yediremedik.",
      },
      {
        person: "other",
        time: getMessageTime(6),
        message:
          "Suçu kocasına atmak için sokakta arbede çıkartıp çırağın dükkandan dışarı çıkmasını sağladık. Sonra da içinde Zehra'nın kanlı kıyafetlerinin olduğu poşeti dükkandaki bir dolabın arkasına sakladık. Herkes dışarıdaki araba kazasına odaklandığı için dükkana girip çıktığımızı kimse fark etmedi bile.",
      },
      {
        person: "other",
        time: getMessageTime(6),
        message: "Daha sonra da anonim bir ihbarla suçu Mahmut'a yıktık.",
      },
      {
        person: "other",
        time: getMessageTime(6),
        message:
          "Dedektif, lütfen. Eğer bunları polise anlatırsan Mahmut serbest kalacak ve Zehra'ya zarar verecek.",
      },
      {
        person: "other",
        time: getMessageTime(7),
        message:
          "Eğer kimseye söylemezsen Zehra huzur içinde yaşaybilir. Karar senin, Zehra'nın kaderi senin ellerinde.",
      },
      {
        person: "other",
        time: getMessageTime(8),
        message:
          '"İyi iş dedektif. Davayı çözmeyi başardın. Şimdi son karar senin elinde. Aşağıdaki linke tıkla ve seçimini yap. Sonrasında diğer dedektiflerin ne karar verdiğini de öğren."',
        link: {
          title: "Son kararını vermek için tıkla.",
          url: "/zehra/final-decision/tr",
        },
      },
    ]);
  } else if (
    person === Suspect.KERIM &&
    finalDesision.type === ResultType.KIDNAPPED
  ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Merhaba dedektif...",
      },
      {
        person: "other",
        time: getMessageTime(),
        message:
          "Zehra'nın benimle kaçtığını düşünmekte haklı olabilirsin, çok şüpheli hareketlerim oldu.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Ankara'da olmam, Zehra'yla görüşmeye çalışmam, onun evinin çevresinde dolaşmam bu olanların üzerine şüpheli gözüküyor olabilir, farkındayım.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Ama size doğruyu söylüyorum, Zehra benimle görüşmeyi hiç istemedi. Aradan seneler geçmişti, artık beni unutmuştu bile. Onun için geçmişten gelen bir tanıdıktan farksızdım.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Sadece onun nasıl olduğunu görmek istedim. Kafede, sokakta takılıp uzaktan da olsa onu sadece bir saniyeliğine görmek istedim. O beni fark etmeyecekti bile, kimseye bir zararım olmayacaktı.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Ona ne olduğuna dair hiçbir fikrim yok, umarım güvendedir. Ona bir şey olmadığını öğrenene kadar içim asla rahat etmeyecek.",
      },
    ]);
  } else if (person === Suspect.MAHMUT) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message: "Ben mi? Ben karıma ne yapmış olabilirim??",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Tamam, evet alt komşumla bir ilişkim vardı ama ben asla ciddi değildim. Zehra pek cilveli birisi değildi ben de sadece ihtiyacımı karşılıyordum.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Onun dışında ben karımı seviyorum dedektif. Düzgün, namuslu bir kadın. Çocuklarımın da anası olacak.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Başına ne geldiyse bulup lütfen evine geri getirin. Yuvasına sağ salim dönsün.",
      },
    ]);
  } else if (person === Suspect.YELIZ) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(1),
        message: "Ay ben napıcam kadın başıma dedektif...",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Mahmut'u ondan çok kıskanıyor ve Mahmut'un sadece benim olmasını deli gibi istiyor muydum? Evet... Ama bu demek değil ki ben o kadına kötü bir şey yapmış olayım.",
      },
      {
        person: "other",
        time: getMessageTime(2),
        message:
          "Mahmut onu boşayacaktı zaten, sonra da benimle evlenecekti. Benim Zehra'ya kötü bir şey yapmak için hiçbir sebebim yok.",
      },
      {
        person: "other",
        time: getMessageTime(3),
        message:
          "Başka bir sorunuz yoksa bir kek yapayım. Mahmutcuğum çok üzülmüştür şimdi... Bu kötü zamanlarda ona destek olacak biri lazım.",
      },
    ]);
  } else if (person === Suspect.SINAN || person === Suspect.RIZA) {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(),
        message:
          "Benim bu olayla hiçbir alakam yok. Benim suçlu olduğumu da nereden çıkardınız?",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Umarım ayinli kurbanlı mesajları ciddiye almamışsınızdır. Onlar sadece bizim oynadığımız bilgisayar oyununun bir parçasıydı.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message: "Zehra ablaya ne olduğuna dair hiçbir fikrim yok.",
      },
    ]);
  } else {
    result = initialMessage.concat([
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Ne?! Nasıl benim yaptığımı düşünebilirsiniz? Benim bu konuyla hiçbir alakam yok.",
      },
      {
        person: "other",
        time: getMessageTime(1),
        message:
          "Yanlış kişiyi yakaladınız dedektif. Benimle vakit kaybetmeyin, detayları bir daha gözden geçirin.",
      },
    ]);
  }

  return result.concat({
    person: "system",
    message: "Kişi çevirimdışı...",
  });
};


import React, { useEffect } from "react";
import { X, BriefcaseBusiness } from "lucide-react";

export default function DiscoverOpportunityModal({ onClose }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="discover-opportunity-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <BriefcaseBusiness size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="discover-opportunity-title"
                className="truncate text-lg font-semibold text-slate-900 sm:text-xl"
              >
                Discover Business Opportunities
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                व्यावसायिक अवसरों को जानें
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close / बंद करें"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
          <div className="mx-auto max-w-3xl">
            {/* Title */}
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                A New Beginning,{" "}
                <span className="text-emerald-700">
                  New Opportunities
                </span>
              </h3>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                एक नई शुरुआत, नए अवसर
              </p>

              <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-emerald-600" />
            </div>

            {/* Introduction */}
            <div className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                Discover opportunities to move closer to your dreams, embrace
                a better lifestyle, and explore personal and professional
                growth. Learn about nutrition products, share your experiences,
                connect with new people, and develop your skills through
                interactive learning.
              </p>

              <p>
                अपने सपनों की दिशा में आगे बढ़ने, बेहतर जीवनशैली अपनाने और
                व्यक्तिगत व व्यावसायिक विकास की संभावनाएँ तलाशने के अवसर
                जानें। पोषण उत्पादों के बारे में सीखें, अपने अनुभव साझा करें,
                नए लोगों से जुड़ें और संवादात्मक प्रशिक्षण से अपने कौशल को
                विकसित करें।
              </p>

              <p>
                If you want to make a positive change in your life or explore
                opportunities to earn additional income, this journey may be
                a new beginning for you.
              </p>

              <p>
                यदि आप अपने जीवन में सकारात्मक बदलाव लाना चाहते हैं या
                अतिरिक्त आय कमाने के अवसर तलाश रहे हैं, तो यह यात्रा आपके
                लिए एक नई शुरुआत हो सकती है।
              </p>

              <p>
                Our objective is to encourage a structured and responsible
                direct-selling environment where people can learn about
                nutrition products, improve their skills, and explore
                long-term business possibilities.
              </p>

              <p>
                हमारा उद्देश्य एक व्यवस्थित और जिम्मेदार प्रत्यक्ष-विक्रय
                वातावरण को प्रोत्साहित करना है, जहाँ लोग पोषण उत्पादों की
                जानकारी प्राप्त कर सकें, अपने कौशल को निखार सकें और
                दीर्घकालिक व्यावसायिक संभावनाओं को समझ सकें।
              </p>
            </div>

            {/* Opportunity Image */}
            <div className="my-7 overflow-hidden rounded-2xl bg-slate-50 shadow-sm">
              <img
                src="/discover-opportunity.jpg"
                alt="Business opportunities / व्यावसायिक अवसर"
                className="block h-auto w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Support System */}
            <section className="mb-7">
              <h4 className="mb-1 text-lg font-bold text-slate-900">
                Support & Guidance
              </h4>

              <p className="mb-2 text-sm font-medium text-emerald-700">
                सहयोग एवं मार्गदर्शन
              </p>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                A strong support system may include multilingual assistance,
                regional guidance, and responsive management to help
                participants understand their responsibilities and available
                resources.
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                एक प्रभावी सहयोग व्यवस्था में बहुभाषी सहायता, क्षेत्रीय
                मार्गदर्शन और उत्तरदायी प्रबंधन शामिल हो सकते हैं, जिससे
                प्रतिभागियों को अपनी जिम्मेदारियों और उपलब्ध संसाधनों को
                समझने में मदद मिलती है।
              </p>
            </section>

            {/* Compensation Plan */}
            <section className="mb-7">
              <h4 className="mb-1 text-lg font-bold text-slate-900">
                Flexible Incentive Opportunities
              </h4>

              <p className="mb-2 text-sm font-medium text-emerald-700">
                लचीले प्रोत्साहन के अवसर
              </p>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                Depending on the applicable business plan, compensation may
                include commissions on product sales and other defined
                incentives. Actual earnings depend on sales, plan conditions,
                and individual effort. No specific income or success is
                guaranteed.
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                लागू व्यावसायिक योजना के अनुसार उत्पाद बिक्री पर कमीशन और
                निर्धारित प्रोत्साहन शामिल हो सकते हैं। वास्तविक कमाई बिक्री,
                योजना की शर्तों और व्यक्तिगत प्रयासों पर निर्भर करती है।
                किसी निश्चित आय या सफलता की गारंटी नहीं होती।
              </p>
            </section>

            {/* Premium Products */}
            <section className="mb-7">
              <h4 className="mb-1 text-lg font-bold text-slate-900">
                Nutrition Product Awareness
              </h4>

              <p className="mb-2 text-sm font-medium text-emerald-700">
                पोषण उत्पादों की जानकारी
              </p>

              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                When choosing nutrition products, it is important to understand
                their ingredients, quality information, manufacturing standards,
                and directions for use. Product claims should be consistent
                with available official information and supporting evidence.
              </p>

              <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                पोषण उत्पाद चुनते समय उनकी सामग्री, गुणवत्ता संबंधी जानकारी,
                निर्माण मानकों और उपयोग के निर्देशों को समझना महत्वपूर्ण है।
                उत्पादों से जुड़े दावे उपलब्ध आधिकारिक जानकारी और प्रमाणों
                के अनुरूप होने चाहिए।
              </p>
            </section>

            {/* Education */}
            <section className="mb-7">
              <h4 className="mb-1 text-lg font-bold text-slate-900">
                Learning & Training Opportunities
              </h4>

              <p className="mb-3 text-sm font-medium text-emerald-700">
                प्रशिक्षण एवं सीखने के अवसर
              </p>

              <ul className="space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                <li>
                  <strong className="text-slate-800">
                    • Business Introduction Sessions
                  </strong>
                  <p>
                    व्यवसाय परिचय सत्र — Learn about business operations,
                    opportunities, and responsibilities.
                  </p>
                  व्यवसाय की कार्यप्रणाली, अवसरों और जिम्मेदारियों को समझें।
                </li>

                <li>
                  <strong className="text-slate-800">
                    • New Participant Training
                  </strong>
                  <p>
                    नए प्रतिभागियों के लिए प्रशिक्षण — Understand the basics,
                    product information, and getting started.
                  </p>
                  बुनियादी जानकारी, उत्पादों और कार्य शुरू करने की प्रक्रिया
                  को समझें।
                </li>

                <li>
                  <strong className="text-slate-800">
                    • Leadership Development
                  </strong>
                  <p>
                    नेतृत्व विकास — Improve communication, teamwork, and
                    decision-making skills.
                  </p>
                  संवाद, टीमवर्क और निर्णय लेने के कौशल विकसित करें।
                </li>

                <li>
                  <strong className="text-slate-800">
                    • Online Webinars
                  </strong>
                  <p>
                    ऑनलाइन वेबिनार — Learn and connect with participants
                    remotely.
                  </p>
                  ऑनलाइन माध्यम से सीखें और अन्य प्रतिभागियों से जुड़ें।
                </li>

                <li>
                  <strong className="text-slate-800">
                    • Fitness Sessions & Workshops
                  </strong>
                  <p>
                    फिटनेस सत्र एवं कार्यशालाएँ — Explore active living,
                    general nutrition education, and fitness awareness.
                  </p>
                  सक्रिय जीवनशैली, सामान्य पोषण शिक्षा और फिटनेस संबंधी
                  जानकारी प्राप्त करें।
                </li>
              </ul>
            </section>

            {/* Brand Message */}
            <div className="rounded-2xl bg-emerald-50 px-5 py-6 text-center">
              <p className="text-base font-semibold leading-7 text-emerald-900 sm:text-lg">
                Take a Step Towards a Better Future
              </p>

              <p className="mt-1 text-sm font-medium leading-7 text-emerald-800">
                बेहतर भविष्य की ओर एक कदम बढ़ाएँ
              </p>

              <p className="mt-3 text-sm leading-7 text-emerald-800/80">
                Learn, grow, connect with others, and explore opportunities
                through informed and responsible decisions.
              </p>

              <p className="mt-2 text-sm leading-7 text-emerald-800/80">
                सीखें, आगे बढ़ें, लोगों से जुड़ें और सोच-समझकर जिम्मेदार
                निर्णय लेते हुए नए अवसर तलाशें।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


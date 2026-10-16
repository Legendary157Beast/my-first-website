
import { useEffect } from "react";
import { X, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
        className="
          relative
          flex
          w-full
          max-w-4xl
          max-h-[92vh]
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <ShieldCheck size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="privacy-policy-title"
                className="truncate text-lg font-semibold text-slate-900 sm:text-xl"
              >
                Privacy Policy / गोपनीयता नीति
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                Your Privacy Matters / आपकी गोपनीयता महत्वपूर्ण है
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Privacy Policy / गोपनीयता नीति बंद करें"
            className="
              ml-3
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              active:scale-95
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Policy Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-7 sm:py-7">
          <article className="mx-auto max-w-3xl text-sm leading-7 text-slate-700 sm:text-[15px]">
            <h1 className="mb-5 text-2xl font-bold text-slate-900 sm:text-3xl">
              Privacy Policy / गोपनीयता नीति
            </h1>

            <p className="mb-5">
              We value the trust you place in us. We aim to handle transactions
              securely and respect the privacy of customer information. Please
              read this policy to understand how personal information may be
              collected, used, stored, and disclosed through this website.
              <br />
              <span className="text-slate-500">
                हम आपके विश्वास को महत्व देते हैं। हमारा उद्देश्य लेन-देन को
                सुरक्षित रखना और ग्राहकों की जानकारी की गोपनीयता का सम्मान
                करना है। कृपया इस नीति को पढ़ें ताकि आप समझ सकें कि इस वेबसाइट
                के माध्यम से व्यक्तिगत जानकारी कैसे एकत्र, उपयोग, संग्रहीत और
                साझा की जा सकती है।
              </span>
            </p>

            <div className="mb-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Note / ध्यान दें:</strong>{" "}
              This policy may be updated from time to time. Please review it
              periodically to remain informed about changes.
              <br />
              <span>
                इस नीति को समय-समय पर अपडेट किया जा सकता है। बदलावों की जानकारी
                के लिए कृपया समय-समय पर इसकी समीक्षा करें।
              </span>
            </div>

            <p className="mb-5">
              By using this website, you acknowledge this Privacy Policy. If you
              do not agree with its terms, please do not use the website or
              its services.
              <br />
              <span className="text-slate-500">
                इस वेबसाइट का उपयोग करके आप इस गोपनीयता नीति को स्वीकार करते
                हैं। यदि आप इसकी शर्तों से सहमत नहीं हैं, तो कृपया वेबसाइट या
                इसकी सेवाओं का उपयोग न करें।
              </span>
            </p>

            <p className="mb-8">
              Your personal information will be handled as described in this
              policy and subject to applicable law. Please also review the
              website's Terms and Conditions.
              <br />
              <span className="text-slate-500">
                आपकी व्यक्तिगत जानकारी को इस नीति और लागू कानून के अनुसार
                संभाला जाएगा। कृपया वेबसाइट के नियम एवं शर्तों की भी समीक्षा
                करें।
              </span>
            </p>

            {/* 1 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                1. Collection of Personal Information / व्यक्तिगत जानकारी का संग्रह
              </h3>

              <p>
                When you use this website, we may collect personal information
                that you provide, such as your name, contact details, delivery
                information, and details needed to provide requested services.
                The information collected should be limited to what is
                necessary for the stated purpose.
                <br />
                <span className="text-slate-500">
                  जब आप इस वेबसाइट का उपयोग करते हैं, तो हम आपके द्वारा दी गई
                  व्यक्तिगत जानकारी एकत्र कर सकते हैं, जैसे आपका नाम, संपर्क
                  विवरण, डिलीवरी संबंधी जानकारी और अनुरोधित सेवाएँ प्रदान करने
                  के लिए आवश्यक विवरण। एकत्र की जाने वाली जानकारी घोषित उद्देश्य
                  के लिए आवश्यक सीमा तक ही होनी चाहिए।
                </span>
              </p>

              <p className="mt-4">
                You may be able to browse certain parts of the website without
                providing personal information. Some services or features may
                require specific information. Where applicable, required fields
                should be distinguished from optional fields.
                <br />
                <span className="text-slate-500">
                  आप व्यक्तिगत जानकारी दिए बिना वेबसाइट के कुछ हिस्सों को
                  ब्राउज़ कर सकते हैं। कुछ सेवाओं या सुविधाओं के लिए विशेष
                  जानकारी आवश्यक हो सकती है। जहाँ लागू हो, अनिवार्य और वैकल्पिक
                  फ़ील्ड अलग-अलग दर्शाए जाने चाहिए।
                </span>
              </p>

              <p className="mt-4">
                Depending on the website's actual configuration, technical
                information may be collected automatically. This could include
                browser type, IP address, pages visited, referring URLs, and
                navigation activity. Such information should be used only for
                disclosed and legitimate purposes.
                <br />
                <span className="text-slate-500">
                  वेबसाइट की वास्तविक व्यवस्था के आधार पर तकनीकी जानकारी
                  स्वतः एकत्र की जा सकती है। इसमें ब्राउज़र का प्रकार, IP
                  पता, देखे गए पृष्ठ, रेफ़रिंग URL और वेबसाइट पर नेविगेशन
                  गतिविधि शामिल हो सकती है। ऐसी जानकारी का उपयोग केवल बताए गए
                  और वैध उद्देश्यों के लिए किया जाना चाहिए।
                </span>
              </p>
            </section>

            {/* 2 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                2. Use of Information / जानकारी का उपयोग
              </h3>

              <p>
                Personal information may be used to provide requested services,
                process orders, communicate with users, provide customer
                support, maintain account security, and improve website
                functionality.
                <br />
                <span className="text-slate-500">
                  व्यक्तिगत जानकारी का उपयोग अनुरोधित सेवाएँ प्रदान करने,
                  ऑर्डर संसाधित करने, उपयोगकर्ताओं से संपर्क करने, ग्राहक
                  सहायता देने, अकाउंट की सुरक्षा बनाए रखने और वेबसाइट की
                  कार्यक्षमता बेहतर बनाने के लिए किया जा सकता है।
                </span>
              </p>

              <p className="mt-4">
                Where marketing communications are sent, applicable consent,
                notification, and opt-out requirements should be followed.
                Information may also be analysed to understand website usage
                and improve services.
                <br />
                <span className="text-slate-500">
                  मार्केटिंग संदेश भेजते समय लागू सहमति, सूचना और सदस्यता
                  समाप्त करने संबंधी आवश्यकताओं का पालन किया जाना चाहिए।
                  वेबसाइट के उपयोग को समझने और सेवाओं में सुधार करने के लिए
                  जानकारी का विश्लेषण भी किया जा सकता है।
                </span>
              </p>

              <p className="mt-4">
                Technical information, such as an IP address, may be used for
                security, troubleshooting, and website administration where
                applicable.
                <br />
                <span className="text-slate-500">
                  IP पते जैसी तकनीकी जानकारी का उपयोग, जहाँ लागू हो, सुरक्षा,
                  तकनीकी समस्याओं का समाधान और वेबसाइट के संचालन के लिए किया
                  जा सकता है।
                </span>
              </p>
            </section>

            {/* 3 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                3. Cookies and Similar Technologies / कुकीज़ और समान तकनीकें
              </h3>

              <p>
                Cookies are small data files that a website may store in your
                browser to remember preferences, maintain sessions, or support
                website functionality. Their actual use depends on the
                website's configuration.
                <br />
                <span className="text-slate-500">
                  कुकीज़ छोटी डेटा फ़ाइलें होती हैं जिन्हें वेबसाइट आपकी
                  प्राथमिकताएँ याद रखने, सेशन बनाए रखने या वेबसाइट की
                  कार्यक्षमता में सहायता के लिए ब्राउज़र में संग्रहीत कर सकती
                  है। उनका वास्तविक उपयोग वेबसाइट की व्यवस्था पर निर्भर करता है।
                </span>
              </p>

              <p className="mt-4">
                If cookies or similar technologies are used, the website should
                explain their purposes and provide any controls or choices
                required by applicable law.
                <br />
                <span className="text-slate-500">
                  यदि कुकीज़ या समान तकनीकों का उपयोग किया जाता है, तो वेबसाइट
                  को उनके उद्देश्यों की जानकारी देनी चाहिए और लागू कानून के
                  अनुसार आवश्यक नियंत्रण या विकल्प उपलब्ध कराने चाहिए।
                </span>
              </p>
            </section>

            {/* 4 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                4. Sharing of Personal Information / व्यक्तिगत जानकारी साझा करना
              </h3>

              <p>
                Personal information may be disclosed when required by
                applicable law or a valid legal process, or when disclosure is
                otherwise lawfully permitted.
                <br />
                <span className="text-slate-500">
                  व्यक्तिगत जानकारी का खुलासा लागू कानून या वैध कानूनी
                  प्रक्रिया के तहत आवश्यक होने पर, अथवा कानून द्वारा अन्यथा
                  अनुमति मिलने पर किया जा सकता है।
                </span>
              </p>

              <p className="mt-4">
                Information may be shared with service providers who help
                operate the website or fulfil requested services, where
                appropriate safeguards and applicable legal requirements are
                followed.
                <br />
                <span className="text-slate-500">
                  उचित सुरक्षा उपायों और लागू कानूनी आवश्यकताओं का पालन करते
                  हुए, जानकारी उन सेवा प्रदाताओं के साथ साझा की जा सकती है जो
                  वेबसाइट चलाने या अनुरोधित सेवाएँ पूरी करने में सहायता करते हैं।
                </span>
              </p>

              <p className="mt-4">
                If a merger, acquisition, or business restructuring is proposed,
                personal information may be transferred only where legally
                permitted and subject to applicable privacy requirements.
                <br />
                <span className="text-slate-500">
                  यदि विलय, अधिग्रहण या व्यावसायिक पुनर्गठन प्रस्तावित हो, तो
                  व्यक्तिगत जानकारी का हस्तांतरण केवल कानूनी रूप से अनुमत होने
                  और लागू गोपनीयता आवश्यकताओं के अधीन किया जा सकता है।
                </span>
              </p>

              <p className="mt-4">
                The website operator should identify the categories of
                recipients and the purposes of sharing accurately. Personal
                information should not be sold or shared for unrelated purposes
                unless the practice is lawful, properly disclosed, and any
                required consent has been obtained.
                <br />
                <span className="text-slate-500">
                  वेबसाइट संचालक को जानकारी साझा करने वाले प्राप्तकर्ताओं की
                  श्रेणियों और उद्देश्यों का सही विवरण देना चाहिए। व्यक्तिगत
                  जानकारी को असंबंधित उद्देश्यों के लिए बेचा या साझा नहीं किया
                  जाना चाहिए, जब तक कि ऐसा करना कानूनन वैध, उचित रूप से घोषित
                  और आवश्यक सहमति के अधीन न हो।
                </span>
              </p>
            </section>

            {/* 5 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                5. Links to Other Websites / अन्य वेबसाइटों के लिंक
              </h3>

              <p>
                This website may contain links to third-party websites. Those
                websites may have their own privacy policies and data-handling
                practices. Review their policies before providing information.
                <br />
                <span className="text-slate-500">
                  इस वेबसाइट पर तीसरे पक्ष की वेबसाइटों के लिंक हो सकते हैं।
                  उन वेबसाइटों की अपनी गोपनीयता नीतियाँ और डेटा संभालने की
                  प्रक्रियाएँ हो सकती हैं। जानकारी देने से पहले उनकी नीतियों
                  की समीक्षा करें।
                </span>
              </p>
            </section>

            {/* 6 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                6. Security Precautions / सुरक्षा उपाय
              </h3>

              <p>
                Appropriate technical and organisational measures should be
                used to protect personal information against unauthorised
                access, loss, misuse, alteration, or disclosure. No method of
                transmission or storage can be guaranteed to be completely
                secure.
                <br />
                <span className="text-slate-500">
                  व्यक्तिगत जानकारी को अनधिकृत पहुँच, हानि, दुरुपयोग, बदलाव
                  या खुलासे से बचाने के लिए उचित तकनीकी और संगठनात्मक उपाय
                  अपनाए जाने चाहिए। जानकारी भेजने या संग्रहीत करने का कोई भी
                  तरीका पूर्ण सुरक्षा की गारंटी नहीं दे सकता।
                </span>
              </p>
            </section>

            {/* 7 */}
            <section className="mb-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                7. Your Choices and Consent / आपकी पसंद और सहमति
              </h3>

              <p>
                Where required, consent will be requested before collecting or
                using personal information for specific purposes. Depending on
                applicable law and the services provided, you may have rights
                to access, correct, delete, or otherwise manage your personal
                information.
                <br />
                <span className="text-slate-500">
                  जहाँ आवश्यक हो, विशेष उद्देश्यों के लिए व्यक्तिगत जानकारी
                  एकत्र या उपयोग करने से पहले सहमति ली जाएगी। लागू कानून और
                  प्रदान की जाने वाली सेवाओं के अनुसार, आपको अपनी व्यक्तिगत
                  जानकारी देखने, सुधारने, हटाने या अन्य तरीकों से प्रबंधित
                  करने के अधिकार मिल सकते हैं।
                </span>
              </p>

              <p className="mt-4">
                If this policy changes, the updated version should be published
                on this page along with any additional notice required by law.
                <br />
                <span className="text-slate-500">
                  यदि इस नीति में बदलाव होता है, तो अपडेट की गई नीति इस पृष्ठ
                  पर प्रकाशित की जानी चाहिए और कानून के अनुसार आवश्यक अतिरिक्त
                  सूचना भी दी जानी चाहिए।
                </span>
              </p>
            </section>

            {/* 8 */}
            <section className="mb-4">
              <h3 className="mb-3 text-lg font-bold text-slate-900">
                8. Contact and Privacy Requests / संपर्क और गोपनीयता संबंधी अनुरोध
              </h3>

              <p className="mb-4">
                If you have questions about this policy or want to make a
                privacy-related request, contact the website operator using
                the official contact details published on this website.
                <br />
                <span className="text-slate-500">
                  यदि इस नीति के बारे में आपके प्रश्न हैं या आप गोपनीयता से
                  संबंधित कोई अनुरोध करना चाहते हैं, तो इस वेबसाइट पर प्रकाशित
                  आधिकारिक संपर्क विवरण के माध्यम से वेबसाइट संचालक से संपर्क
                  करें।
                </span>
              </p>

            </section>
          </article>
        </div>

          
        </div>
      </div>
   
  );
}

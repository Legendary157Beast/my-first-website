
import React, { useEffect } from "react";
import { X, FileText } from "lucide-react";

export default function TermsConditionsModal({ onClose }) {
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
        aria-labelledby="terms-conditions-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <FileText size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="terms-conditions-title"
                className="text-base font-semibold text-slate-900 sm:text-xl"
              >
                Terms & Conditions
              </h2>

              <p className="text-xs text-slate-500 sm:text-sm">
                नियम एवं शर्तें
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Terms and Conditions / बंद करें"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={21} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-4 py-5 text-sm leading-7 text-slate-700 sm:px-7 sm:py-6">
          <div className="mb-6 rounded-xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-900">
              Please read these Terms & Conditions carefully before using
              this website.
            </p>
            <p className="mt-1 text-emerald-800">
              इस वेबसाइट का उपयोग करने से पहले कृपया इन नियमों एवं शर्तों
              को ध्यानपूर्वक पढ़ें।
            </p>
          </div>

          <p className="mb-4">
            These Terms & Conditions describe the general rules for accessing
            and using this website, its content, and the services offered
            through it.
          </p>
          <p className="mb-6">
            ये नियम एवं शर्तें इस वेबसाइट, इसकी सामग्री और इसके माध्यम से
            उपलब्ध सेवाओं को देखने तथा उपयोग करने के सामान्य नियमों का
            वर्णन करती हैं।
          </p>

          <p className="mb-4">
            By accessing or using the website, you acknowledge that you have
            read these Terms. Any additional consent or agreement required
            by applicable law will be obtained where necessary.
          </p>
          <p className="mb-6">
            वेबसाइट का उपयोग करके आप स्वीकार करते हैं कि आपने इन शर्तों को
            पढ़ लिया है। लागू कानून के अनुसार जहाँ अतिरिक्त सहमति आवश्यक
            होगी, वहाँ उसे प्राप्त किया जाएगा।
          </p>

          <section className="space-y-7">
            {/* 1 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                1. Introduction
              </h3>
              <p>
                This website provides information about products, services,
                educational resources, and other relevant content. Access
                is subject to these Terms and any applicable policies
                published on the website.
              </p>
              <p className="mt-2">
                <strong>1. परिचय:</strong> यह वेबसाइट उत्पादों, सेवाओं,
                शैक्षिक संसाधनों और अन्य संबंधित जानकारी उपलब्ध कराती है।
                इसका उपयोग इन शर्तों तथा वेबसाइट पर प्रकाशित लागू नीतियों
                के अधीन है।
              </p>
            </div>

            {/* 2 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                2. User Account, Password and Security
              </h3>
              <p>
                If account registration is available, users must provide
                accurate information and protect their login credentials.
                Users should promptly report suspected unauthorized access
                through the official support channel provided on the website.
              </p>
              <p className="mt-2">
                <strong>2. उपयोगकर्ता खाता, पासवर्ड और सुरक्षा:</strong>
                यदि खाता पंजीकरण उपलब्ध है, तो उपयोगकर्ताओं को सही जानकारी
                देनी चाहिए और अपने लॉगिन विवरण सुरक्षित रखने चाहिए।
                अनधिकृत पहुँच का संदेह होने पर वेबसाइट पर दिए गए आधिकारिक
                सहायता माध्यम से तुरंत सूचना दें।
              </p>
            </div>

            {/* 3 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                3. Services
              </h3>
              <p>
                The website may provide product information, educational
                content, customer support, and online purchasing facilities.
                Orders are subject to product availability, confirmed pricing,
                payment processing, and applicable order policies.
              </p>
              <p className="mt-2">
                <strong>3. सेवाएँ:</strong> वेबसाइट पर उत्पादों की जानकारी,
                शैक्षिक सामग्री, ग्राहक सहायता और ऑनलाइन खरीदारी की सुविधा
                उपलब्ध हो सकती है। ऑर्डर उत्पादों की उपलब्धता, पुष्ट कीमत,
                भुगतान प्रक्रिया और लागू ऑर्डर नीतियों के अधीन होंगे।
              </p>
            </div>

            {/* 4 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                4. Privacy Policy
              </h3>
              <p>
                Personal information collected through the website should
                be handled in accordance with the applicable Privacy Policy
                and relevant data-protection laws.
              </p>
              <p className="mt-2">
                <strong>4. गोपनीयता नीति:</strong> वेबसाइट के माध्यम से
                एकत्र की गई व्यक्तिगत जानकारी को लागू गोपनीयता नीति और
                संबंधित डेटा-सुरक्षा कानूनों के अनुसार संभाला जाना चाहिए।
              </p>
            </div>

            {/* 5 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                5. Eligibility and Permitted Use
              </h3>
              <p>
                Users must meet applicable age and legal requirements.
                Website content may not be copied, reproduced, distributed,
                modified, or commercially exploited without authorization,
                except where permitted by law.
              </p>
              <p className="mt-2">
                <strong>5. पात्रता एवं अनुमत उपयोग:</strong> उपयोगकर्ताओं
                को लागू आयु और कानूनी आवश्यकताओं को पूरा करना होगा।
                कानून द्वारा अनुमत परिस्थितियों को छोड़कर वेबसाइट की
                सामग्री को बिना अनुमति कॉपी करना, पुनः प्रकाशित करना,
                वितरित करना, बदलना या व्यावसायिक रूप से उपयोग करना
                प्रतिबंधित है।
              </p>
            </div>

            {/* 6 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                6. User Conduct and Rules
              </h3>
              <p>
                Users must use the website lawfully and respectfully.
                The following activities are prohibited:
              </p>
              <p className="mt-2">
                <strong>6. उपयोगकर्ता का आचरण एवं नियम:</strong> उपयोगकर्ताओं
                को वेबसाइट का उपयोग कानून के अनुसार और सम्मानजनक तरीके से
                करना चाहिए। निम्नलिखित गतिविधियाँ प्रतिबंधित हैं:
              </p>

              <ul className="mt-3 list-disc space-y-3 pl-5">
                <li>
                  Harassing, threatening, defaming, or violating another
                  person's legal rights.
                  <p>किसी व्यक्ति को परेशान करना, धमकाना, बदनाम करना या
                  उसके कानूनी अधिकारों का उल्लंघन करना।</p>
                </li>
                <li>
                  Publishing unlawful, abusive, obscene, or otherwise
                  inappropriate content.
                  <p>गैरकानूनी, अपमानजनक, अश्लील या अनुचित सामग्री प्रकाशित
                  करना।</p>
                </li>
                <li>
                  Uploading content that infringes intellectual-property
                  rights.
                  <p>बौद्धिक संपदा अधिकारों का उल्लंघन करने वाली सामग्री
                  अपलोड करना।</p>
                </li>
                <li>
                  Uploading malware, viruses, or files intended to damage
                  systems or data.
                  <p>सिस्टम या डेटा को नुकसान पहुँचाने वाले वायरस,
                  मैलवेयर या फाइलें अपलोड करना।</p>
                </li>
                <li>
                  Using the website to promote unlawful schemes, deceptive
                  activities, or misleading offers.
                  <p>वेबसाइट का उपयोग गैरकानूनी योजनाओं, धोखाधड़ी या
                  भ्रामक प्रस्तावों के प्रचार के लिए करना।</p>
                </li>
                <li>
                  Removing copyright notices, legal notices, or ownership
                  information without authorization.
                  <p>बिना अनुमति कॉपीराइट सूचना, कानूनी नोटिस या स्वामित्व
                  संबंधी जानकारी हटाना।</p>
                </li>
                <li>
                  Violating applicable laws, website guidelines, or these
                  Terms.
                  <p>लागू कानूनों, वेबसाइट के दिशानिर्देशों या इन शर्तों
                  का उल्लंघन करना।</p>
                </li>
              </ul>
            </div>

            {/* 7 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                7. User Content
              </h3>
              <p>
                Users are responsible for content they submit or upload.
                They must have the necessary rights or permissions to share
                that content and must not infringe the rights of others.
              </p>
              <p className="mt-2">
                <strong>7. उपयोगकर्ता की सामग्री:</strong> उपयोगकर्ताओं
                द्वारा भेजी या अपलोड की गई सामग्री के लिए वे स्वयं
                जिम्मेदार हैं। सामग्री साझा करने के लिए उनके पास आवश्यक
                अधिकार या अनुमति होनी चाहिए और उससे दूसरों के अधिकारों
                का उल्लंघन नहीं होना चाहिए।
              </p>
            </div>

            {/* 8 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                8. Product Information and Accuracy
              </h3>
              <p>
                Product descriptions, images, prices, ingredients, and
                availability are provided for information and may change.
                Users should review the current product label and official
                product information before making a purchase or using a
                product. Applicable return and refund policies will govern
                eligible requests.
              </p>
              <p className="mt-2">
                <strong>8. उत्पाद संबंधी जानकारी एवं सटीकता:</strong>
                उत्पादों के विवरण, चित्र, कीमतें, सामग्री और उपलब्धता
                जानकारी के लिए दी जाती हैं और इनमें बदलाव हो सकता है।
                खरीदारी या उपयोग से पहले वर्तमान उत्पाद लेबल और आधिकारिक
                जानकारी की जाँच करें। पात्र अनुरोधों पर लागू रिटर्न और
                रिफंड नीति के अनुसार कार्रवाई की जाएगी।
              </p>
            </div>

            {/* 9 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                9. Intellectual Property Rights
              </h3>
              <p>
                Website design, logos, text, graphics, software, and other
                protected materials may belong to the website operator or
                their respective rights holders. Such materials may not be
                used without permission unless the law allows it.
              </p>
              <p className="mt-2">
                <strong>9. बौद्धिक संपदा अधिकार:</strong> वेबसाइट का
                डिज़ाइन, लोगो, टेक्स्ट, ग्राफिक्स, सॉफ्टवेयर और अन्य
                संरक्षित सामग्री वेबसाइट संचालक या संबंधित अधिकारधारकों
                की हो सकती है। कानून द्वारा अनुमति न होने पर इनका उपयोग
                बिना अनुमति नहीं किया जा सकता।
              </p>
            </div>

            {/* 10 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                10. Third-Party Links
              </h3>
              <p>
                The website may contain links to third-party websites or
                services. Those websites operate under their own policies,
                and the website operator does not automatically endorse
                or control their content.
              </p>
              <p className="mt-2">
                <strong>10. तृतीय-पक्ष लिंक:</strong> वेबसाइट पर अन्य
                वेबसाइटों या सेवाओं के लिंक हो सकते हैं। वे अपनी नीतियों
                के अनुसार संचालित होते हैं। ऐसे लिंक की मौजूदगी का अर्थ
                यह नहीं है कि वेबसाइट संचालक उनकी सामग्री का समर्थन करता
                है या उस पर नियंत्रण रखता है।
              </p>
            </div>

            {/* 11 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                11. Disclaimer and Limitation of Liability
              </h3>
              <p>
                Website information is provided in good faith, but its
                accuracy, completeness, and availability cannot always be
                guaranteed. To the extent permitted by applicable law,
                liability will be determined under the governing legal
                requirements and any valid applicable agreements.
              </p>
              <p className="mt-2">
                <strong>11. अस्वीकरण एवं दायित्व की सीमा:</strong>
                वेबसाइट की जानकारी सद्भावना से उपलब्ध कराई जाती है, लेकिन
                उसकी सटीकता, पूर्णता और उपलब्धता की हर समय गारंटी नहीं
                दी जा सकती। लागू कानून द्वारा अनुमत सीमा तक दायित्व का
                निर्धारण संबंधित कानूनी प्रावधानों और वैध समझौतों के
                अनुसार होगा।
              </p>
            </div>

            {/* 12 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                12. Indemnification
              </h3>
              <p>
                Where permitted by law, users may be responsible for
                losses or claims arising directly from their unlawful
                actions, infringement of others' rights, or material
                breach of these Terms.
              </p>
              <p className="mt-2">
                <strong>12. क्षतिपूर्ति:</strong> कानून द्वारा अनुमत सीमा
                तक, उपयोगकर्ता के गैरकानूनी कार्यों, दूसरों के अधिकारों
                के उल्लंघन या इन शर्तों के गंभीर उल्लंघन से सीधे उत्पन्न
                होने वाली हानि या दावों के लिए उपयोगकर्ता जिम्मेदार हो
                सकता है।
              </p>
            </div>

            {/* 13 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                13. Pricing and Payments
              </h3>
              <p>
                Prices and applicable charges will be displayed through
                the relevant product or checkout pages. The final payable
                amount will be shown before order confirmation. Prices,
                product availability, and offers may change, subject to
                applicable law.
              </p>
              <p className="mt-2">
                <strong>13. कीमतें एवं भुगतान:</strong> कीमतें और लागू
                शुल्क संबंधित उत्पाद पृष्ठ या चेकआउट पर दिखाए जाएँगे।
                ऑर्डर की पुष्टि से पहले अंतिम देय राशि प्रदर्शित की
                जाएगी। लागू कानून के अधीन कीमतों, उत्पादों की उपलब्धता
                और ऑफर्स में बदलाव हो सकता है।
              </p>
            </div>

            {/* 14 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                14. Shipping and Delivery
              </h3>
              <p>
                Shipping options, delivery estimates, applicable charges,
                and delivery restrictions will be communicated through
                the relevant website pages or during checkout. Delivery
                estimates are not guaranteed unless expressly stated.
              </p>
              <p className="mt-2">
                <strong>14. शिपिंग एवं डिलीवरी:</strong> शिपिंग के विकल्प,
                अनुमानित डिलीवरी समय, लागू शुल्क और डिलीवरी संबंधी
                प्रतिबंध वेबसाइट के संबंधित पृष्ठों या चेकआउट के दौरान
                बताए जाएँगे। जब तक स्पष्ट रूप से न कहा गया हो, डिलीवरी
                समय की गारंटी नहीं है।
              </p>
            </div>

            {/* 15 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                15. Suspension and Termination
              </h3>
              <p>
                Access may be restricted or suspended where reasonably
                necessary to address suspected fraud, security risks,
                unlawful activity, or material violations of these Terms,
                subject to applicable law.
              </p>
              <p className="mt-2">
                <strong>15. निलंबन एवं समाप्ति:</strong> लागू कानून के
                अधीन, धोखाधड़ी के संदेह, सुरक्षा जोखिम, गैरकानूनी गतिविधि
                या इन शर्तों के गंभीर उल्लंघन से निपटने के लिए आवश्यक
                होने पर वेबसाइट की पहुँच सीमित या निलंबित की जा सकती है।
              </p>
            </div>

            {/* 16 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                16. Governing Law and Disputes
              </h3>
              <p>
                These Terms are subject to applicable laws. Any dispute
                will be handled by the competent authority or court
                determined under applicable law and any valid agreement
                between the relevant parties.
              </p>
              <p className="mt-2">
                <strong>16. लागू कानून एवं विवाद:</strong> ये शर्तें लागू
                कानूनों के अधीन हैं। किसी भी विवाद का निपटारा लागू कानून
                और संबंधित पक्षों के बीच किसी वैध समझौते के अनुसार
                सक्षम प्राधिकरण या न्यायालय द्वारा किया जाएगा।
              </p>
            </div>

            {/* 17 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                17. Headings
              </h3>
              <p>
                Headings are included for convenience and do not change
                the meaning or interpretation of the relevant provisions.
              </p>
              <p className="mt-2">
                <strong>17. शीर्षक:</strong> शीर्षक केवल सुविधा के लिए
                दिए गए हैं। वे संबंधित प्रावधानों के अर्थ या व्याख्या
                को नहीं बदलते।
              </p>
            </div>

            {/* 18 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                18. Severability
              </h3>
              <p>
                If any provision of these Terms is found to be invalid
                or unenforceable, the remaining provisions will continue
                to apply to the extent permitted by law.
              </p>
              <p className="mt-2">
                <strong>18. पृथक्करणीयता:</strong> यदि इन शर्तों का कोई
                प्रावधान अमान्य या लागू करने योग्य नहीं पाया जाता है,
                तो कानून द्वारा अनुमत सीमा तक बाकी प्रावधान प्रभावी
                बने रहेंगे।
              </p>
            </div>

            {/* 19 */}
            <div>
              <h3 className="mb-2 text-base font-semibold text-slate-900">
                19. Reporting Abuse
              </h3>
              <p>
                Users may report suspected abuse, security concerns,
                unlawful content, or violations of these Terms through
                the official support contact published on the website.
              </p>
              <p className="mt-2">
                <strong>19. दुरुपयोग की रिपोर्ट:</strong> उपयोगकर्ता
                संदिग्ध दुरुपयोग, सुरक्षा संबंधी चिंताओं, गैरकानूनी
                सामग्री या इन शर्तों के उल्लंघन की सूचना वेबसाइट पर
                प्रकाशित आधिकारिक सहायता संपर्क के माध्यम से दे सकते हैं।
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

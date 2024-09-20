import { Label } from "@/components/ui/label"
import { formatDate } from "@/lib/utils"

export default function PrivacyPolicy() {
    const currentDate = formatDate("2024-09-20");

    return (
        <section className='pb-24 pt-40'>

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                <div className="mb-6">
                    <Label>Effective Date: {currentDate}</Label>
                </div>

                <p className="mb-4">
                    Daffa Akbar (`&quot;`we`&quot;`, `&quot;`our`&quot;`, or `&quot;`us`&quot;`) operates the portofoliodaffa.vercel.app website (referred to as the &quot;Service`&quot;`). This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our Service.
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
                    <p>
                        We do not actively collect personal information from visitors to our portfolio website. However, if you voluntarily contact us via a contact form, email, or other means, we may collect and store the personal information you provide, such as your name, email address, and any other details you include in your communication.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use the Information</h2>
                    <p>
                        Any personal information collected will be used solely for the purpose of responding to your inquiries, providing you with information, or improving the Service. We do not sell, rent, or share your personal information with third parties, except as required by law.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Log Data</h2>
                    <p>
                        We may collect information that your browser sends whenever you visit our website. This log data may include information such as your computer&apos;s Internet Protocol (`&quot;`IP`&quot;`) address, browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
                    <p>
                        Our website may use cookies to improve the user experience. A cookie is a small file placed on your computer&apos;s hard drive to help us analyze web traffic or let us know when you visit a specific page. You can choose to accept or decline cookies through your browser settings.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
                    <p>
                        Our website may contain links to other websites. Please note that we are not responsible for the privacy practices of other sites. We encourage you to review the privacy policies of any third-party websites you visit.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                    <p>
                        We take reasonable measures to protect the personal information provided to us through our website. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date at the top.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <p className="mt-2">
                        Daffa Akbar<br />
                        Email: daffaputradamar@gmail.com<br />
                        Website: portofoliodaffa.vercel.app
                    </p>
                </section>
            </div>
        </section>
    )
}
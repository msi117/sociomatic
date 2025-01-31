"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ErrorMessages from "@/components/molecule/errors-messages";
import Loader from "@/components/molecule/loader";
import { useToast } from "@/components/ui/use-toast";
import { Building, MessageCircle, Phone } from "lucide-react";
import axios from "axios";
import Link from "next/link";



  // // Function to track contact form submissions
  // function trackContactFormSubmission(formdata: any) {
  //   if(typeof window !== "undefined"){
  //     window["dataLayer"] = window?.dataLayer || [];
  //   var formData = formdata;

  //   window.dataLayer.push({
  //     'event': 'contactFormSubmission',
  //     'formName': 'Contact Form',
  //     'formData': formData
  //     // Add other necessary parameters for form submission
  //     // Example: 'formType': 'Contact Us',
  //     //          'customParameter': 'value',
  //   });
  //   }
  // }



const ContactUs = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
    subject: "Contact Us",
    title: "Contact Us Form Submission"
  });
  const [errors, setErrors] = useState<any>({});
  const [captcha, setCaptcha] = useState(false);

  // testing api route
  const SendEmail = async (formData: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://sociomatic-backend.onrender.com/auth/receive-mail",
        formData,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Message Sending",
          description: "Successful! Mail send successfully.",
        });
        setLoading(false);
        // setTimeout(() => {
        //   window.location.reload();
        // }, 5000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        variant: "error",
        title: "Message Sending",
        description: "Failed! Something went wrong.",
      });
    }
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validation();

    if (Object.keys(validationErrors).length === 0) {
      SendEmail(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  const validation = () => {
    console.log(formData);
    let obj: any = {};
    if (!formData.name.trim()) {
      obj.name = "Name is required!";
    }
    if (!formData.email.trim()) {
      obj.email = "Email is required!";
    }

    if (!formData.phone.trim()) {
      obj.phone = "Phone is required!";
    }

    if (
      formData.services.length < 1 ||
      (formData.services.length > 1 && !Array.isArray(formData.services))
    ) {
      obj.services = "Choose at least one!";
    }

    if (currentTab !== 1) {
      if (!formData.budgetRange.trim()) {
        obj.budgetRange = "Budget range is required!";
      }
    }

    return obj;
  };
  const ContactInfo = [
    {
      id: 0,
      icon: <Phone />,
      title: "Make a Call",
      info: "+971507477541",
    },
    {
      id: 1,
      icon: <Building />,
      title: "Main Office",
      info: "Business Center 1, M Floor, Nad Al Sheba, Dubai, U.A.E",
    },
    {
      id: 2,
      icon: <MessageCircle />,
      title: "WhatsApp",
      info: "+971567268607",
    },
  ];
  return (
    <div className="bg-[url('/images/backgrounds/StarBackground.svg')] bg-cover bg-center">
      <div className="container section grid grid-cols-1 md:grid-cols-2 small-gap">
        <div className="flex flex-col bg-primary rounded-xl p-[25px] lg:p-[50px] large-gap">
          <div className="flex flex-col small-gap">
            <h1 className="text-white">Contact Us</h1>
            <p className="text-secondarymuted">
              Feel free to reach out to us via email or WhatsApp at any time! We
              aim to respond to all inquiries within 24 hours on business days.
              We&apos;re delighted to address any questions you may have.
            </p>
          </div>
          {ContactInfo.map((item: any) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-[10px] [&>svg]:stroke-white"
              >
                {item.icon}
                <h3 className="text-[16px] lg:text-[20px] font-bold text-white">
                  {item.title}
                </h3>
                {item.id === 2 || item.id === 0 ? (
                  <Link href={`tel:${item.info}`} className="text-white">
                    {item.info}
                  </Link>
                ) : (
                  <p className="text-white">{item.info}</p>
                )}
              </div>
            );
          })}
        </div>
        <form onSubmit={handleOnSubmit} className="mx-auto pt-[50px] grid grid-cols-1 large-gap">
          <div className="flex flex-col small-gap">
            <h4 className="text-xl md:text-2xl font-bold text-primary">
              Get in Touch With Us
            </h4>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">
                Name <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Input
                type="name"
                id="name"
                placeholder="Name"
                name="name"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="name" />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">
                Email <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="email" />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">
                Phone <span className="text-pink-600 font-bold">*</span>
              </Label>
              <Input
                type="phone"
                id="phone"
                placeholder="Phone"
                name="phone"
                onChange={handleOnChange}
              />
              <ErrorMessages errors={errors} name="phone" />
            </div>
          </div>
          <div className="flex flex-col small-gap">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="message">
                Services you are interested on&nbsp;
                <span className="text-pink-600 font-bold">*</span>
              </Label>
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
                {ServicesList.map((item: any) => {
                  return (
                    <li key={item.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={item.name}
                        onCheckedChange={(value) =>
                          setFormData({
                            ...formData,
                            services: value
                              ? [...formData.services, item.value]
                              : [
                                  ...formData.services.filter(
                                    (service: any) => service !== item.value
                                  ),
                                ],
                          })
                        }
                      />
                      <label
                        htmlFor={item.name}
                        className="peer-disabled:opacity-70 cursor-pointer"
                      >
                        {item.value}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <ErrorMessages errors={errors} name="services" />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                placeholder="Type your message here."
                id="message"
                name="message"
                onChange={handleOnChange}
              />
            </div>
            <ReCAPTCHA
              sitekey={process.env.siteKey!}
              onChange={(e: any) => {
                console.log(e);
                e ? setCaptcha(true) : setCaptcha(false);
              }}
            />

            <Button
              variant={"secondary"}
              className="mt-5 max-w-[300px]"
              disabled={!captcha}
              // onClick={handleOnSubmit}
              type="submit"
            >
              {loading ? <Loader /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

const ServicesList = [
  {
    id: 1,
    value: "Google Paid Ads",
    name: "googlePaidAds",
  },
  {
    id: 2,
    value: "Data Analytics",
    name: "dataAnalytics",
  },
  {
    id: 3,
    value: "Custom Web Development",
    name: "customWebDevelopment",
  },
  {
    id: 4,
    value: "Wordpress Development",
    name: "wordpressDevelopment",
  },
  {
    id: 5,
    value: "Social Media Paid Ads",
    name: "socialMediaPaidAds",
  },
  {
    id: 6,
    value: "Software Development",
    name: "softwareDevelopment",
  },
  {
    id: 7,
    value: "Shopify Store Development",
    name: "shopifyStoreDevelopment",
  },
  {
    id: 8,
    value: "UI/UX & Graphic Design",
    name: "uiUxAndGraphicDesign",
  },
];

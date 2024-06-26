'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DashboardIcon, EnvelopeClosedIcon, GitHubLogoIcon, InstagramLogoIcon, ResetIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  const [progress, setProgress] = useState(1);
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    const opened = localStorage.getItem('isOpened') === 'true';
    setIsOpened(opened);
    console.log('isOpened:', opened);

    if (!opened) {
      const duration = 8000;
      const interval = duration / 100;

      const timer = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            setIsSecondDialogOpen(true);
            return 100;
          }
          return prevProgress + 1;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  };

  useEffect(() => {
    if (isSecondDialogOpen) {
      localStorage.setItem('isOpened', 'true');
    }
  }, [isSecondDialogOpen]);

  const handleReset = () => {
    localStorage.setItem('isOpened', 'false');
    setIsOpened(false);
    toast("Values are being reset.")
  }

  const handleCancel = () => {
    setProgress(1);
    setIsSecondDialogOpen(false);
    const opened = localStorage.getItem('isOpened') === 'true';
    setIsOpened(opened);
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.svg" type="image/svg" sizes="70x70" />
        <title>MAKE EVERYTHING OKAY | PEACE 🫰</title>
        <meta name="description" content="You cannot find peace by avoiding life." />
      </Head>
      
      <main className="flex min-h-screen flex-col items-center justify-center md:p-24 p-0  backgroundImg">

        <Button variant='link' className="absolute h-8 top-4 left-4 flex flex-row gap-2" onClick={() => router.push('https://github.com/the-bipu/make-everything-ok')}>
          <div className="w-auto h-auto flex items-center justify-center rounded-full bg-black p-1">
            <DashboardIcon className="w-4 h-4 text-white" />
          </div>
          <span>Make Everything Okay</span>
        </Button>

        <Button variant='link' className="absolute h-8 top-4 right-4 flex flex-row gap-2" onClick={handleReset}>
          <span>Reset</span>
          <div className="w-auto h-auto flex items-center justify-center rounded-full bg-black p-1">
            <ResetIcon className="w-4 h-4 text-white" />
          </div>
        </Button>

        {!isSecondDialogOpen && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className=" md:w-96 w-10/12 md:h-24 h-auto button-11" role="button" onClick={handleOpen}>
                <div className="button-11__content">
                  <div className="button-11__icon">
                    <Image src='/peace.png' alt="" width={40} height={40} />
                  </div>
                  <p className="button-11__text text">Make Everything OK</p>
                </div>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex flex-col">
                  {!isOpened ? (
                    <>
                      <span>Making everything OK is in progress.</span>
                      <span className="mb-4 text-sm font-normal">Please wait for some time while we make everything OK.</span>
                    </>
                  ) : (
                    <>
                      <span>Everything is already fine.</span>
                      <span className="mb-4 text-sm font-normal">Don&apos;t stress too much, life is too short to take stress. Wanna talk, we&apos;re here for you.</span></>
                  )}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {!isOpened && <Progress value={progress} className="mb-4" />}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {!isOpened ? (
                  <AlertDialogCancel className="h-8" onClick={handleCancel}>still wanna stop!?</AlertDialogCancel>
                ) : (
                  <AlertDialogCancel className="h-8" onClick={() => router.push('https://wa.me/7004817946')}>We&apos;re here!</AlertDialogCancel>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {isSecondDialogOpen && (
          <AlertDialog open={true}>
            <AlertDialogContent className="bg-[#009568] border-[5px] border-[#056548] rounded-sm flex flex-col items-center justify-center text-center p-10">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-bold text-white text-center">Everything is OK now</AlertDialogTitle>
                <AlertDialogDescription className="text-lg font-medium text-white text-center">
                  If everything is still not OK,
                  try checking your settings of perception of objective reality.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => { setIsSecondDialogOpen(false); setProgress(100) }} className="h-10 text-[#056548] bg-white border-4 border-[#056548] hover:bg-gray-100">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        <div className="absolute bottom-4 flex flex-row gap-2">
          <Badge onClick={() => router.push('https://github.com/the-bipu/make-everything-ok')} variant="default" className="flex flex-row gap-2 rounded-sm py-1 cursor-pointer">
            <GitHubLogoIcon className="w-4 h-4" />
            <span className="md:flex hidden">Github</span>
          </Badge>
          <Badge onClick={() => router.push('mailto:thebippu@gmail.com')} variant="default" className="flex flex-row gap-2 rounded-sm py-1 cursor-pointer">
            <EnvelopeClosedIcon className="w-4 h-4" />
            <span className="md:flex hidden">Email</span>
          </Badge>
          <Badge onClick={() => router.push('https://www.instagram.com/___thenormi_xd/')} variant="default" className="flex flex-row gap-2 rounded-sm py-1 cursor-pointer">
            <InstagramLogoIcon className="w-4 h-4" />
            <span className="md:flex hidden">Instagram</span>
          </Badge>
        </div>

      </main>
    </>
  );
}
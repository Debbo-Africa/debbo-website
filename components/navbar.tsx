"use client"

import { useState } from "react"
import { Menu, ChevronDown } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ButtonComponent from "./Button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="DébboAfrica"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Individual
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Corporate
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              About Us
            </a>
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <ButtonComponent />
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-6 mt-8">
                <a href="#" className="text-lg font-medium text-gray-700">
                  Individual
                </a>
                <a href="#" className="text-lg font-medium text-gray-700">
                  Corporate
                </a>
                <a href="#" className="text-lg font-medium text-gray-700">
                  About Us
                </a>
                <a href="#" className="text-lg font-medium text-gray-700">
                  Resources
                </a>
                <ButtonComponent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

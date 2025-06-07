
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const mistakeOptions = [
  "Forgot our date 💔",
  "Missed your call 📞",
  "Cancelled plans 😔",
  "Sent a wrong text 📝",
  "Other... 🙈",
];

export default function GrievanceApp() {
  const [mistake, setMistake] = useState("");
  const [customMistake, setCustomMistake] = useState("");
  const [details, setDetails] = useState("");
  const [fixes, setFixes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedMistake =
    mistake === "Other... 🙈" ? customMistake : mistake;

  const canSubmit = selectedMistake && fixes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: integrate API or email service
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl rounded-2xl">
          <CardContent>
            <h1 className="text-3xl font-extrabold mb-6 text-center text-pink-700">
              Oops! What did I do? 😳
            </h1>
            {submitted ? (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-4"
              >
                <p className="text-lg">Thank you! Your apology is on its way ❤️</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setMistake("");
                    setCustomMistake("");
                    setDetails("");
                    setFixes("");
                  }}
                >
                  File Another
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-2 font-medium text-pink-600">
                    Select Mistake
                  </label>
                  <Select onValueChange={setMistake}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a mistake" />
                    </SelectTrigger>
                    <SelectContent>
                      {mistakeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {mistake === "Other... 🙈" && (
                  <div>
                    <label className="block mb-2 font-medium text-pink-600">
                      Please Specify
                    </label>
                    <Input
                      placeholder="Type your mistake here..."
                      value={customMistake}
                      onChange={(e) => setCustomMistake(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block mb-2 font-medium text-pink-600">
                    Details (optional)
                  </label>
                  <Textarea
                    placeholder="Tell me more..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-pink-600">
                    How I’ll Fix It
                  </label>
                  <Textarea
                    placeholder="My plan to make it right..."
                    value={fixes}
                    onChange={(e) => setFixes(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" disabled={!canSubmit} className="w-full">
                    Send Apology 💌
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

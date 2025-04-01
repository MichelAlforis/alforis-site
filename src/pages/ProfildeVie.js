// Page Profil de Vie – Alforis Match v3.3

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  "Ce que vous protégez à tout prix ?",
  "Ce qui vous empêche de dormir ?",
  "Ce que vous voulez transmettre à vos enfants ?",
  "Ce que vous feriez si l’argent n’était plus un problème ?",
  "Quel serait votre mode de vie idéal dans 5 ans ?"
];

const results = [
  "Le Stratège Libre",
  "Le Voyageur Ambitieux",
  "Le Gardien Silencieux",
  "Le Rebelle Structuré",
  "L’Épicurien Responsable"
];

export default function ProfilDeVie() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [completed, setCompleted] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const randomProfile = results[Math.floor(Math.random() * results.length)];
      setProfile(randomProfile);
      setCompleted(true);
    }
  };

  const handleChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1D1D1D] flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {!completed ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-semibold mb-6">{questions[step]}</h2>
            <textarea
              className="w-full p-4 border border-[#D1C5B0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8A765]"
              rows="4"
              value={answers[step]}
              onChange={handleChange}
              placeholder="Écrivez votre réponse ici..."
            />
            <div className="flex justify-end mt-6">
              <Button onClick={handleNext} className="bg-[#C8A765] text-white hover:bg-[#b99755]">
                {step < questions.length - 1 ? "Suivant" : "Voir mon profil"}
              </Button>
            </div>
            <div className="mt-4">
              <Progress value={progress} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Votre profil : {profile}</h2>
            <p className="text-lg mb-6">Merci pour vos réponses. Voici le profil qui semble le plus en phase avec votre trajectoire de vie.</p>
            <div className="flex flex-col gap-4">
              <Button className="bg-[#C8A765] text-white hover:bg-[#b99755]">Réserver un appel</Button>
              <Button variant="outline">Être rappelé</Button>
              <Button variant="ghost">Recevoir une analyse personnalisée</Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

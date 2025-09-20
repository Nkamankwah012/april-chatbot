import { useState } from "react";
import { ChevronDown, ChevronRight, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "Why isn't my AC cooling properly?",
    answer: "Several factors can cause poor cooling: dirty air filters, low refrigerant levels, blocked vents, or thermostat issues. Start by checking and replacing your air filter, ensure all vents are open and unblocked, and verify your thermostat settings.",
    category: "Cooling Issues"
  },
  {
    id: "2", 
    question: "How often should I change my air filter?",
    answer: "Generally, air filters should be changed every 1-3 months depending on usage, home size, and filter type. Homes with pets or allergies may need more frequent changes. Check monthly and replace when visibly dirty.",
    category: "Maintenance"
  },
  {
    id: "3",
    question: "What temperature should I set my thermostat?",
    answer: "For optimal comfort and efficiency, set your thermostat to 78°F (26°C) when you're home during summer, and 7-10 degrees higher when away. In winter, 68°F (20°C) when home and lower when away.",
    category: "Energy Efficiency"
  },
  {
    id: "4",
    question: "Why is my AC making strange noises?",
    answer: "Different noises indicate different issues: rattling may mean loose parts, squealing could be belt problems, clicking might be electrical issues, and grinding suggests motor problems. Turn off your system and contact a professional for unusual sounds.",
    category: "Troubleshooting"
  },
  {
    id: "5",
    question: "How can I improve my system's energy efficiency?",
    answer: "Use a programmable thermostat, seal air leaks, ensure proper insulation, maintain your system regularly, use ceiling fans to circulate air, and consider upgrading to a high-efficiency system if yours is over 10 years old.",
    category: "Energy Efficiency"
  },
  {
    id: "6",
    question: "When should I schedule maintenance?",
    answer: "Schedule professional maintenance twice yearly - once in spring before cooling season and once in fall before heating season. Regular maintenance prevents breakdowns, improves efficiency, and extends system lifespan.",
    category: "Maintenance"
  }
];

export const FAQTab = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="h-full overflow-y-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-foreground-secondary">
          Quick answers to common HVAC questions
        </p>
      </div>

      {/* FAQ Categories */}
      {Object.entries(groupedFAQs).map(([category, categoryFAQs], categoryIndex) => (
        <div key={category} className={`space-y-3 animate-fade-in`} style={{ animationDelay: `${categoryIndex * 100}ms` }}>
          <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide text-primary">
            {category}
          </h3>
          
          {categoryFAQs.map((faq, faqIndex) => {
            const isExpanded = expandedIds.has(faq.id);
            
            return (
              <div
                key={faq.id}
                className={cn(
                  "glass-card overflow-hidden transition-all duration-300",
                  isExpanded && "shadow-[var(--shadow-medium)]"
                )}
                style={{ animationDelay: `${(categoryIndex * 100) + (faqIndex * 50)}ms` }}
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <HelpCircle className="w-3 h-3 text-primary" />
                    </div>
                    <span className="font-medium text-foreground text-sm leading-relaxed">
                      {faq.question}
                    </span>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-foreground-muted transition-transform" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-foreground-muted transition-transform" />
                    )}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-4 pb-4 animate-fade-in">
                    <div className="pl-9">
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Contact Support Card */}
      <div className="glass-card p-4 text-center space-y-3 animate-fade-in animation-delay-800">
        <h3 className="font-semibold text-foreground">Still need help?</h3>
        <p className="text-sm text-foreground-secondary">
          Our support team is here to assist you with any questions.
        </p>
        <button className="gradient-button text-sm px-4 py-2">
          Contact Support
        </button>
      </div>
    </div>
  );
};
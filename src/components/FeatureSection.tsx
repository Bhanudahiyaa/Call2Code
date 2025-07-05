import React from "react";
import {
  Activity,
  BarChart3,
  MessageSquare,
  BellRing,
  LayoutGrid,
  TrendingUp,
} from "lucide-react";

interface FeatureSectionProps {
  darkMode: boolean;
}

const features = [
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    title: "Real-Time Stock Data",
    description:
      "Instant price updates and key financial metrics for top stocks.",
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-green-500" />,
    title: "Trend Visualization",
    description:
      "Interactive charts to track both historical and live market movements.",
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
    title: "Sentiment Analysis",
    description:
      "Real-time news and social sentiment insights (positive, negative, neutral) powered by NLP.",
  },
];

const FeatureSection: React.FC<FeatureSectionProps> = ({ darkMode }) => {
  return (
    <section
      className={`rounded-2xl backdrop-blur-xl transition-all duration-300 border p-6 mt-10 ${
        darkMode
          ? "bg-gray-900/40 border-gray-800/50 text-white"
          : "bg-white/40 border-gray-200/50 text-gray-900"
      }`}
    >
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold animate-fadeIn">Platform Features</h2>
        <p
          className={`mt-2 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Explore what powers Market Pulse.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-xl p-5 transition-transform transform hover:scale-105 hover-glow ${
              darkMode ? "bg-gray-800/50" : "bg-white/50"
            } animate-slideIn`}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <div className="mb-3">{feature.icon}</div>
            <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;

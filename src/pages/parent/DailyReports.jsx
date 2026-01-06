import { ParentLayout } from "@/components/layout/ParentLayout";
import { useState, useEffect } from "react";
import {
  FileText,
  Calendar,
  Utensils,
  Moon,
  Activity,
  MessageCircle,
  ChevronLeft,
  Search,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { ParentLoading } from "@/components/parent/ParentLoading";
import { ParentEmptyState } from "@/components/parent/ParentEmptyState";
import { parentServices } from "@/services/parent.schema";
import toast from "react-hot-toast";

/* =========================
   Helpers
========================= */

const parseJSON = (value, fallback) => {
  try {
    if (!value) return fallback;
    if (typeof value === "string") return JSON.parse(value);
    return value;
  } catch {
    return fallback;
  }
};


const parseSleep = (sleep) => {
  const parsed = parseJSON(sleep, {});
  return {
    quality: parsed.quality || "غير محدد",
    note: parsed.note || "",
  };
};

const getSleepLabel = (quality) => {
  const labels = {
    good: "نوم جيد",
    fair: "نوم متوسط",
    poor: "نوم سيء",
  };
  return labels[quality] || quality;
};

const getSleepColor = (quality) => {
  const colors = {
    good: "bg-success text-success-foreground",
    fair: "bg-warning text-warning-foreground",
    poor: "bg-destructive text-destructive-foreground",
  };
  return colors[quality] || "bg-secondary text-secondary-foreground";
};

const parseFoodIntake = (foodIntake) => {
  const parsed = parseJSON(foodIntake, []);
  return Array.isArray(parsed) ? parsed : [];
};

const parseBehavior = (behavior) => {
  const parsed = parseJSON(behavior, {});
  return {
    mood: parsed.mood || "عادي",
    notes: parsed.notes || "",
  };
};

/* =========================
   Component
========================= */

export default function DailyReports() {
  const [dailyReports, setDailyReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchDailyReports = async (page = 1, append = false) => {
    try {
      if (!append) setLoading(true);

      await parentServices.getDailyReports(page, {
        onSuccess: (response) => {
          const reports = response.data.map((r) => ({
            id: r.id,
            date: r.date,
            activities: Array.isArray(r.activity_level)
            ? r.activity_level.map(a =>
                typeof a === "string" ? a : a.name
              )
            : [],
            foodIntake: parseFoodIntake(r.food_intake),
            sleep: parseSleep(r.sleep_quality),
            behavior: parseBehavior(r.behavior),
            generalNotes: r.general_notes || "",
          }));

          setDailyReports((prev) =>
            append ? [...prev, ...reports] : reports
          );

          setHasMore(response.data.length === 10);
        },
        onError: (err) => {
          if (err.status === 404) {
            setDailyReports([]);
            setHasMore(false);
          } else {
            setError("فشل تحميل التقارير");
            toast.error("فشل تحميل التقارير");
          }
        },
      });
    } catch {
      toast.error("خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyReports();
  }, []);

  if (loading && dailyReports.length === 0) {
    return (
      <ParentLayout>
        <ParentLoading variant="page" text="جاري تحميل التقارير..." />
      </ParentLayout>
    );
  }

  const filteredReports = dailyReports.filter((r) =>
    r.date.includes(searchQuery)
  );

  if (!loading && filteredReports.length === 0) {
    return (
      <ParentLayout>
        <ParentEmptyState type="daily-reports" />
      </ParentLayout>
    );
  }

  return (
    <ParentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">التقارير اليومية 📋</h1>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
            <Input
              className="pr-10 w-64"
              placeholder="بحث بالتاريخ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="cursor-pointer hover:shadow-md"
            >
              <CardContent className="p-4 flex items-center justify-between  rounded-2xl">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-semibold text-gray-800">
                    {new Date(report.date).toLocaleDateString("ar-SA-u-nu-latn", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <Activity className="h-3 w-3 inline ml-1" />
                    {report.activities.length} أنشطة
                  </p>
                </div>
              </div>
              <ChevronLeft className="text-gray-400" />
            </CardContent>
            </Card>
          ))}
        </div>

        {/* Dialog */}
        <Dialog
          open={!!selectedReport}
          onOpenChange={() => setSelectedReport(null)}
        >
          <DialogContent className="max-w-2xl">
            {selectedReport && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    التقرير اليومي
                  </DialogTitle>
                  <DialogDescription>
                    {new Date(selectedReport.date).toLocaleDateString("ar-SA-u-nu-latn", {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[65vh]">
                  <div className="space-y-6">
                    {/* Activities */}
                    <div className="p-4 rounded-xl bg-secondary/20">
                      <h4 className="font-semibold flex items-center gap-2 mb-3 text-primary">
                        <Activity className="h-5 w-5" />
                        أنشطة اليوم
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {selectedReport.activities.map((activity, i) => (
                          <Badge
                            key={i}
                            className="bg-background text-foreground border border-border rounded-full px-3 py-1"
                          >
                            <Activity className="h-3 w-3 ml-1" />
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Separator />

                    {/* Sleep */}
                      <div className="p-4 rounded-xl bg-secondary/20">
                        <h4 className="font-semibold flex items-center gap-2 mb-3 text-primary">
                          <Moon className="h-5 w-5" />
                          جودة النوم
                        </h4>

                        <div className="flex items-center gap-3">
                          <Badge
                            className={`rounded-full px-3 py-1 ${getSleepColor(
                              selectedReport.sleep.quality
                            )}`}
                          >
                            <Moon className="h-3 w-3 ml-1" />
                            {getSleepLabel(selectedReport.sleep.quality)}
                          </Badge>
                        </div>

                        {selectedReport.sleep.note && (
                          <div className="mt-3 p-3 rounded-lg bg-background text-sm text-muted-foreground">
                            <MessageCircle className="h-3 w-3 inline ml-1" />
                            {selectedReport.sleep.note}
                          </div>
                        )}
                      </div>


                    <Separator />

                    {/* Behavior */}
                      <div className="p-4 rounded-xl bg-secondary/20">
                        <h4 className="font-semibold flex items-center gap-2 mb-3 text-primary">
                          <Activity className="h-5 w-5" />
                          السلوك
                        </h4>

                        <p className="text-sm font-medium text-foreground">
                          <Activity className="h-3 w-3 inline ml-1" />
                          المزاج: {selectedReport.behavior.mood}
                        </p>

                        {selectedReport.behavior.notes && (
                          <p className="text-sm mt-2 text-muted-foreground">
                            <MessageCircle className="h-3 w-3 inline ml-1" />
                            {selectedReport.behavior.notes}
                          </p>
                        )}
                      </div>


                    {/* General Notes */}
                      {selectedReport.generalNotes && (
                        <div className="p-4 rounded-xl bg-secondary/20">
                          <h4 className="font-semibold flex items-center gap-2 mb-2 text-primary">
                            <MessageCircle className="h-5 w-5" />
                            ملاحظات المعلمة
                          </h4>

                          <p className="text-foreground leading-relaxed">
                            <MessageCircle className="h-3 w-3 inline ml-1" />
                            {selectedReport.generalNotes}
                          </p>
                        </div>
                      )}

                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>

        {hasMore && (
          <div className="flex justify-center">
            <Button onClick={() => fetchDailyReports(currentPage + 1, true)}>
              تحميل المزيد
            </Button>
          </div>
        )}
      </div>
    </ParentLayout>
  );
}

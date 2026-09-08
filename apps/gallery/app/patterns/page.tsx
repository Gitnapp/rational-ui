"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@gitnapp/ui/components/ui/card";
import { CardGrid, MetricGrid, ReadingLayout } from "@gitnapp/ui/components/ui/data-layout";
import { DateRangePicker, type DateWindow } from "@gitnapp/ui/components/ui/date-range-picker";
import { EditableValue } from "@gitnapp/ui/components/ui/editable-value";
import { SectionNavigation } from "@gitnapp/ui/components/ui/section-navigation";
import { ValueOrigin } from "@gitnapp/ui/components/ui/value-origin";
import { RailBreadcrumb } from "@gitnapp/web-shell";
import { useState } from "react";

export default function PatternsPage() {
  const [range, setRange] = useState<DateWindow>({ from: "", to: "" });
  const [value, setValue] = useState("12");
  const [manual, setManual] = useState(false);
  const items = [
    { id: "inputs", title: "按需编辑与数值来源" },
    { id: "cards", title: "稳定字段与自适应卡片" },
  ];
  return (
    <main className="p-6">
      <RailBreadcrumb items={[{ label: "组件库", href: "/" }, { label: "通用交互" }]} />
      <h1 className="my-6 text-2xl font-semibold">通用交互</h1>
      <ReadingLayout navigation={<SectionNavigation items={items} active="inputs" />}>
        <section id="inputs" tabIndex={-1} className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">按需编辑</h2>
          <div className="flex items-center gap-2">
            <EditableValue
              label="示例数值"
              value={value}
              onCommit={(v) => {
                setValue(v);
                setManual(true);
              }}
            />
            <ValueOrigin
              manual={manual}
              onReset={() => {
                setValue("12");
                setManual(false);
              }}
            />
          </div>
          <DateRangePicker
            value={range}
            onChange={setRange}
            presets={[
              { label: "全部", range: { from: "", to: "" } },
              { label: "示例月份", range: { from: "2026-09-01", to: "2026-09-30" } },
            ]}
          />
        </section>
        <section id="cards" tabIndex={-1}>
          <h2 className="mb-4 text-lg font-semibold">同类字段</h2>
          <CardGrid>
            {["完整值", "缺失值"].map((title, i) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <MetricGrid
                    items={[
                      { id: "one", label: "计数", value: i ? null : 120 },
                      { id: "two", label: "零值", value: 0 },
                      { id: "three", label: "其他", value: null },
                    ]}
                  />
                </CardContent>
              </Card>
            ))}
          </CardGrid>
        </section>
      </ReadingLayout>
    </main>
  );
}

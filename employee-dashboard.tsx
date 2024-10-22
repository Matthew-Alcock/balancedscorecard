/* import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/app/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { supabase } from '/lib/supabaseClient'

interface KPI {
  id: number
  name: string
  target: number
  current: number
  unit: string
}

interface EmployeeData {
  id: number
  name: string
}

export default function EmployeeDashboard({ employeeId }: { employeeId: number }) {
  const [employeeKPIs, setEmployeeKPIs] = useState<KPI[]>([])
  const [employee, setEmployee] = useState<EmployeeData | null>(null)

  useEffect(() => {
    fetchEmployee()
    fetchKPIs()

    const kpisSubscription = supabase
      .channel('public:kpis')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kpis' }, fetchKPIs)
      .subscribe()

    return () => {
      kpisSubscription.unsubscribe()
    }
  }, [employeeId])

  async function fetchEmployee() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .eq('id', employeeId)
      .single()
    
    if (error) {
      console.error('Error fetching employee:', error)
    } else {
      setEmployee(data)
    }
  }

  async function fetchKPIs() {
    const { data, error } = await supabase
      .from('kpis')
      .select('*')
      .eq('employee_id', employeeId)
    
    if (error) {
      console.error('Error fetching KPIs:', error)
    } else {
      setEmployeeKPIs(data)
    }
  }

  if (!employee) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Employee KPI Dashboard: {employee.name}</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {employeeKPIs.map((kpi) => {
          const progress = (kpi.current / kpi.target) * 100
          return (
            <Card key={kpi.id}>
              <CardHeader>
                <CardTitle>{kpi.name}</CardTitle>
                <CardDescription>Target: {kpi.target}{kpi.unit}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-sm text-muted-foreground">
                    Current: {kpi.current}{kpi.unit} ({progress.toFixed(1)}%)
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
} */
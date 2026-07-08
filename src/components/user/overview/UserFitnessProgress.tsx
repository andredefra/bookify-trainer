import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target } from "lucide-react";

// Import components from client version
import { CardActions } from "@/components/client/overview/fitness-progress/CardActions";
import { GoalsList } from "@/components/client/overview/fitness-progress/GoalsList";
import { FitnessDialogs } from "@/components/client/overview/fitness-progress/FitnessDialogs";
import { ManageGoalTypesDialog } from "@/components/client/overview/fitness-progress/ManageGoalTypesDialog";
import { ManageActivityTypesDialog } from "@/components/client/overview/fitness-progress/ManageActivityTypesDialog";
import { useFitnessGoals } from "@/components/client/overview/fitness-progress/hooks/useFitnessGoals";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ProgressItem } from "@/components/client/overview/fitness-progress/types";

export function UserFitnessProgress() {
  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openLogDialog, setOpenLogDialog] = useState(false);
  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [openMeasurementsDialog, setOpenMeasurementsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openManageGoalTypesDialog, setOpenManageGoalTypesDialog] = useState(false);
  const [openManageActivityTypesDialog, setOpenManageActivityTypesDialog] = useState(false);

  // Get user profile data (height, gender, age)
  const { profile, calculateAge } = useUserProfile();

  // Initialize with empty progress data
  const initialProgressData: ProgressItem[] = [];

  // Use fitness goals hook
  const {
    progressData,
    bodyMeasurements,
    selectedGoal,
    addGoal,
    updateGoal,
    logActivity,
    logWeight,
    addBodyMeasurements,
    deleteGoal,
    selectGoal,
    clearSelectedGoal
  } = useFitnessGoals(initialProgressData);

  const handleEditGoal = (goal: ProgressItem) => {
    selectGoal(goal);
    setOpenUpdateDialog(true);
  };

  const handleDeletePrompt = (goal: ProgressItem) => {
    selectGoal(goal);
    setOpenDeleteDialog(true);
  };

  const handleDelete = () => {
    deleteGoal();
    setOpenDeleteDialog(false);
    clearSelectedGoal();
  };

  const handleAddGoal = (data: any) => {
    addGoal(data);
    setOpenDialog(false);
  };

  const handleUpdateGoal = (data: any) => {
    updateGoal(data);
    setOpenUpdateDialog(false);
    clearSelectedGoal();
  };

  const handleLogActivity = (data: any) => {
    logActivity(data);
    setOpenLogDialog(false);
  };

  const handleLogWeight = (data: any) => {
    logWeight(data);
    setOpenWeightDialog(false);
  };

  const handleLogMeasurements = (data: any) => {
    addBodyMeasurements(data);
    setOpenMeasurementsDialog(false);
  };

  const calculateBMI = () => {
    const latestWeight = bodyMeasurements[0]?.weight;
    if (profile?.height && latestWeight) {
      const heightInM = profile.height / 100;
      return (latestWeight / (heightInM * heightInM)).toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { status: "Normal", color: "text-green-600" };
    if (bmi < 30) return { status: "Overweight", color: "text-yellow-600" };
    return { status: "Obese", color: "text-red-600" };
  };

  const bmi = calculateBMI();
  const bmiStatus = bmi ? getBMIStatus(parseFloat(bmi)) : null;
  const age = calculateAge(profile?.date_of_birth);
  const latestMeasurement = bodyMeasurements[0];

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Fitness Progress</CardTitle>
          <CardDescription>Track your journey toward your goals</CardDescription>
          
          <CardActions 
            onAddGoal={() => setOpenDialog(true)}
            onLogActivity={() => setOpenLogDialog(true)}
            onLogWeight={() => setOpenWeightDialog(true)}
            onLogMeasurements={() => setOpenMeasurementsDialog(true)}
          />
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {age && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium">{age} years</span>
                  </div>
                )}
                {profile?.gender && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium capitalize">{profile.gender}</span>
                  </div>
                )}
                {profile?.height && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Height:</span>
                    <span className="font-medium">{profile.height} cm</span>
                  </div>
                )}
                {latestMeasurement?.weight && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium">{latestMeasurement.weight} kg</span>
                  </div>
                )}
                {bmi && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">BMI:</span>
                    <span className={`font-medium ${bmiStatus?.color}`}>
                      {bmi} ({bmiStatus?.status})
                    </span>
                  </div>
                )}
                {(!profile?.height || !profile?.gender) && (
                  <p className="text-sm text-muted-foreground mt-4">
                    Set your height and gender in Account Settings for accurate calculations.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Latest Measurements */}
            {latestMeasurement && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Latest Measurements</CardTitle>
                  <CardDescription>
                    {new Date(latestMeasurement.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {latestMeasurement.waist && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Waist:</span>
                      <span className="font-medium">{latestMeasurement.waist} cm</span>
                    </div>
                  )}
                  {latestMeasurement.hips && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hips:</span>
                      <span className="font-medium">{latestMeasurement.hips} cm</span>
                    </div>
                  )}
                  {latestMeasurement.neck && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Neck:</span>
                      <span className="font-medium">{latestMeasurement.neck} cm</span>
                    </div>
                  )}
                  {latestMeasurement.arms && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Arms:</span>
                      <span className="font-medium">{latestMeasurement.arms} cm</span>
                    </div>
                  )}
                  {(latestMeasurement.quadriceps ?? latestMeasurement.thighs) && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quadriceps:</span>
                      <span className="font-medium">{latestMeasurement.quadriceps ?? latestMeasurement.thighs} cm</span>
                    </div>
                  )}
                  {latestMeasurement.shoulders && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shoulders:</span>
                      <span className="font-medium">{latestMeasurement.shoulders} cm</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>My Goals</CardTitle>
              <CardDescription>Track your fitness objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalsList 
                progressData={progressData}
                onEditGoal={handleEditGoal}
                onDeletePrompt={handleDeletePrompt}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Measurements Tab */}
        <TabsContent value="measurements">
          <Card>
            <CardHeader>
              <CardTitle>Body Measurements History</CardTitle>
              <CardDescription>Track changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              {bodyMeasurements.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No measurements recorded yet. Click "Body Measurements" to add your first entry.
                </p>
              ) : (
                <div className="space-y-4">
                  {bodyMeasurements.map((measurement, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">
                          {new Date(measurement.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {measurement.weight && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Weight:</span>
                            <span>{measurement.weight} kg</span>
                          </div>
                        )}
                        {measurement.waist && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Waist:</span>
                            <span>{measurement.waist} cm</span>
                          </div>
                        )}
                        {measurement.hips && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Hips:</span>
                            <span>{measurement.hips} cm</span>
                          </div>
                        )}
                        {measurement.neck && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Neck:</span>
                            <span>{measurement.neck} cm</span>
                          </div>
                        )}
                        {measurement.arms && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Arms:</span>
                            <span>{measurement.arms} cm</span>
                          </div>
                        )}
                        {(measurement.quadriceps ?? measurement.thighs) && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Quadriceps:</span>
                            <span>{measurement.quadriceps ?? measurement.thighs} cm</span>
                          </div>
                        )}
                        {measurement.shoulders && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Shoulders:</span>
                            <span>{measurement.shoulders} cm</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* All Dialogs */}
      <FitnessDialogs 
        progressData={progressData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        openUpdateDialog={openUpdateDialog}
        setOpenUpdateDialog={setOpenUpdateDialog}
        openLogDialog={openLogDialog}
        setOpenLogDialog={setOpenLogDialog}
        openWeightDialog={openWeightDialog}
        setOpenWeightDialog={setOpenWeightDialog}
        openMeasurementsDialog={openMeasurementsDialog}
        setOpenMeasurementsDialog={setOpenMeasurementsDialog}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        openManageActivityTypesDialog={openManageActivityTypesDialog}
        setOpenManageActivityTypesDialog={setOpenManageActivityTypesDialog}
        selectedGoal={selectedGoal}
        onSubmit={handleAddGoal}
        onUpdateSubmit={handleUpdateGoal}
        onLogSubmit={handleLogActivity}
        onWeightSubmit={handleLogWeight}
        onMeasurementsSubmit={handleLogMeasurements}
        onDeleteGoal={handleDelete}
        onManageGoalTypes={() => setOpenManageGoalTypesDialog(true)}
      />
      
      <ManageGoalTypesDialog 
        open={openManageGoalTypesDialog}
        onOpenChange={setOpenManageGoalTypesDialog}
      />
      
      <ManageActivityTypesDialog 
        open={openManageActivityTypesDialog}
        onOpenChange={setOpenManageActivityTypesDialog}
      />
    </div>
  );
}

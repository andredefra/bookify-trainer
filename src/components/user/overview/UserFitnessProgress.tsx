import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, TrendingUp, Scale, Calendar, Edit, Save, X, Activity, Weight, Ruler } from "lucide-react";
import { toast } from "sonner";

interface Activity {
  id: string;
  date: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other';
  name: string;
  duration: number; // in minutes
  intensity: 'low' | 'moderate' | 'high';
  calories?: number;
  notes?: string;
}

interface BodyMeasurements {
  id?: string;
  date: string;
  height?: number;
  weight?: number;
  gender?: 'male' | 'female';
  waist?: number;
  hips?: number;
  neck?: number;
  arms?: number;
  thighs?: number;
  shoulders?: number;
}

interface FitnessGoal {
  id: string;
  type: 'weight_loss' | 'weight_gain' | 'muscle_gain' | 'endurance' | 'strength' | 'flexibility';
  current: number;
  target: number;
  unit: string;
  targetDate: string;
  description: string;
}

interface UserProfile {
  age?: number;
  gender?: 'male' | 'female';
  height?: number;
  weight?: number;
  experienceLevel?: 'principiante' | 'intermedio' | 'avanzato';
  fitnessGoals?: string[];
  weeklyFrequency?: number;
  exercisePreferences?: string[];
  limitations?: string[];
}

export function UserFitnessProgress() {
  const [profile, setProfile] = useState<UserProfile>({});
  const [measurements, setMeasurements] = useState<BodyMeasurements[]>([]);
  const [goals, setGoals] = useState<FitnessGoal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState<BodyMeasurements>({
    date: new Date().toISOString().split('T')[0]
  });
  const [newActivity, setNewActivity] = useState<Activity>({
    id: '',
    date: new Date().toISOString().split('T')[0],
    type: 'cardio',
    name: '',
    duration: 30,
    intensity: 'moderate'
  });
  const [newWeight, setNewWeight] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: ''
  });
  const [newGoal, setNewGoal] = useState<FitnessGoal>({
    id: '',
    type: 'weight_loss',
    current: 0,
    target: 0,
    unit: 'kg',
    targetDate: '',
    description: ''
  });

  useEffect(() => {
    // Load data from localStorage
    const storedProfile = localStorage.getItem('user-fitness-profile');
    const storedMeasurements = localStorage.getItem('user-measurements');
    const storedGoals = localStorage.getItem('user-fitness-goals');
    const storedActivities = localStorage.getItem('user-activities');

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    if (storedMeasurements) {
      setMeasurements(JSON.parse(storedMeasurements));
    }
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('user-fitness-profile', JSON.stringify(profile));
    setEditingProfile(false);
    toast.success("Profile updated successfully!");
  };

  const addMeasurement = () => {
    if (!newMeasurement.weight && !newMeasurement.waist) {
      toast.error("Please enter at least weight or waist measurement");
      return;
    }

    const updatedMeasurements = [newMeasurement, ...measurements];
    setMeasurements(updatedMeasurements);
    localStorage.setItem('user-measurements', JSON.stringify(updatedMeasurements));
    setNewMeasurement({ date: new Date().toISOString().split('T')[0] });
    toast.success("Measurement added!");
  };

  const calculateBMI = () => {
    if (profile.height && profile.weight) {
      const heightInM = profile.height / 100;
      return (profile.weight / (heightInM * heightInM)).toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Underweight", color: "text-blue-600" };
    if (bmi < 25) return { status: "Normal", color: "text-green-600" };
    if (bmi < 30) return { status: "Overweight", color: "text-yellow-600" };
    return { status: "Obese", color: "text-red-600" };
  };

  const addActivity = () => {
    if (!newActivity.name.trim()) {
      toast.error("Please enter activity name");
      return;
    }

    const activityWithId = {
      ...newActivity,
      id: Date.now().toString()
    };

    const updatedActivities = [activityWithId, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem('user-activities', JSON.stringify(updatedActivities));
    setNewActivity({
      id: '',
      date: new Date().toISOString().split('T')[0],
      type: 'cardio',
      name: '',
      duration: 30,
      intensity: 'moderate'
    });
    setShowActivityForm(false);
    toast.success("Activity logged successfully!");
  };

  const addWeightEntry = () => {
    if (!newWeight.weight) {
      toast.error("Please enter your weight");
      return;
    }

    const weightMeasurement: BodyMeasurements = {
      date: newWeight.date,
      weight: parseFloat(newWeight.weight)
    };

    const updatedMeasurements = [weightMeasurement, ...measurements];
    setMeasurements(updatedMeasurements);
    localStorage.setItem('user-measurements', JSON.stringify(updatedMeasurements));
    setNewWeight({
      date: new Date().toISOString().split('T')[0],
      weight: ''
    });
    setShowWeightForm(false);
    toast.success("Weight logged successfully!");
  };

  const addGoal = () => {
    if (!newGoal.description.trim() || !newGoal.target || !newGoal.targetDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const goalWithId = {
      ...newGoal,
      id: Date.now().toString()
    };

    const updatedGoals = [goalWithId, ...goals];
    setGoals(updatedGoals);
    localStorage.setItem('user-fitness-goals', JSON.stringify(updatedGoals));
    setNewGoal({
      id: '',
      type: 'weight_loss',
      current: 0,
      target: 0,
      unit: 'kg',
      targetDate: '',
      description: ''
    });
    setShowGoalForm(false);
    toast.success("Goal created successfully!");
  };

  const getProfileCompleteness = () => {
    const fields = ['age', 'gender', 'height', 'weight', 'experienceLevel', 'fitnessGoals', 'weeklyFrequency'];
    const completedFields = fields.filter(field => profile[field] !== undefined && profile[field] !== null);
    return Math.round((completedFields.length / fields.length) * 100);
  };

  const latestMeasurement = measurements[0];
  const bmi = calculateBMI();
  const bmiStatus = bmi ? getBMIStatus(parseFloat(bmi)) : null;

  return (
    <div className="space-y-6">
      {/* Profile Completeness Alert */}
      {getProfileCompleteness() < 100 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-orange-900">Complete your profile</h3>
                <p className="text-sm text-orange-700">
                  Complete your information to receive personalized plans from the AI trainer
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-900">{getProfileCompleteness()}%</div>
                <Progress value={getProfileCompleteness()} className="w-20 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Forms */}
      {showWeightForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Log Weight</CardTitle>
            <CardDescription>Quick weight entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight-date">Date</Label>
                <Input
                  id="weight-date"
                  type="date"
                  value={newWeight.date}
                  onChange={(e) => setNewWeight({...newWeight, date: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="weight-value">Weight (kg)</Label>
                <Input
                  id="weight-value"
                  type="number"
                  step="0.1"
                  placeholder="Enter your weight"
                  value={newWeight.weight}
                  onChange={(e) => setNewWeight({...newWeight, weight: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addWeightEntry}>
                <Save className="h-4 w-4 mr-2" />
                Save Weight
              </Button>
              <Button variant="outline" onClick={() => setShowWeightForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showGoalForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>Set a fitness target to work towards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select 
                  value={newGoal.type} 
                  onValueChange={(value) => setNewGoal({...newGoal, type: value as FitnessGoal['type']})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="weight_gain">Weight Gain</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="endurance">Endurance</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal-target-date">Target Date</Label>
                <Input
                  id="goal-target-date"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="goal-description">Description</Label>
                <Input
                  id="goal-description"
                  placeholder="e.g., Lose 5kg for summer"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="goal-unit">Unit</Label>
                <Select 
                  value={newGoal.unit} 
                  onValueChange={(value) => setNewGoal({...newGoal, unit: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                    <SelectItem value="minutes">minutes</SelectItem>
                    <SelectItem value="reps">reps</SelectItem>
                    <SelectItem value="sets">sets</SelectItem>
                    <SelectItem value="cm">cm</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal-current">Current Value</Label>
                <Input
                  id="goal-current"
                  type="number"
                  value={newGoal.current}
                  onChange={(e) => setNewGoal({...newGoal, current: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="goal-target">Target Value</Label>
                <Input
                  id="goal-target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({...newGoal, target: parseFloat(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addGoal}>
                <Save className="h-4 w-4 mr-2" />
                Create Goal
              </Button>
              <Button variant="outline" onClick={() => setShowGoalForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Action Buttons - Track your journey */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Track your journey toward your goals with detailed logging</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowGoalForm(true)}
            >
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowActivityForm(true)}
            >
              <Activity className="h-4 w-4" />
              Log Activity
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowWeightForm(true)}
            >
              <Weight className="h-4 w-4" />
              Log Weight
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setActiveTab("measurements")}
            >
              <Ruler className="h-4 w-4" />
              Body Measurements
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="measurements">Measurements</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.age && <div className="flex justify-between"><span>Age:</span><span>{profile.age} years</span></div>}
                {profile.gender && <div className="flex justify-between"><span>Gender:</span><span className="capitalize">{profile.gender}</span></div>}
                {profile.height && <div className="flex justify-between"><span>Height:</span><span>{profile.height} cm</span></div>}
                {profile.weight && <div className="flex justify-between"><span>Weight:</span><span>{profile.weight} kg</span></div>}
                {bmi && (
                  <div className="flex justify-between">
                    <span>BMI:</span>
                    <span className={bmiStatus?.color}>{bmi} ({bmiStatus?.status})</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Latest Measurements */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Latest Measurements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {latestMeasurement ? (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Date:</span><span>{new Date(latestMeasurement.date).toLocaleDateString()}</span>
                    </div>
                    {latestMeasurement.weight && <div className="flex justify-between"><span>Weight:</span><span>{latestMeasurement.weight} kg</span></div>}
                    {latestMeasurement.waist && <div className="flex justify-between"><span>Waist:</span><span>{latestMeasurement.waist} cm</span></div>}
                    {latestMeasurement.hips && <div className="flex justify-between"><span>Hips:</span><span>{latestMeasurement.hips} cm</span></div>}
                    <Button variant="outline" size="sm" onClick={() => setShowWeightForm(true)} className="w-full mt-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Log Weight
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">No measurements recorded</p>
                    <Button size="sm" onClick={() => setShowWeightForm(true)}>
                      <Plus className="h-3 w-3 mr-1" />
                      Log First Weight
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Goals Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {goals.length > 0 ? (
                  <>
                    {goals.slice(0, 2).map((goal) => (
                      <div key={goal.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{goal.description}</span>
                          <span>{goal.current}/{goal.target} {goal.unit}</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setShowGoalForm(true)} className="w-full mt-2">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Goal
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">No goals set</p>
                    <Button size="sm" onClick={() => setShowGoalForm(true)}>
                      <Plus className="h-3 w-3 mr-1" />
                      Create First Goal
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    This information helps the AI create personalized plans
                  </CardDescription>
                </div>
                <Button
                  variant={editingProfile ? "outline" : "default"}
                  onClick={() => editingProfile ? setEditingProfile(false) : setEditingProfile(true)}
                >
                  {editingProfile ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {editingProfile ? "Cancel" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={profile.gender || ''} 
                    onValueChange={(value) => setProfile({...profile, gender: value as 'male' | 'female'})}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height || ''}
                    onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight || ''}
                    onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select 
                    value={profile.experienceLevel || ''} 
                    onValueChange={(value) => setProfile({...profile, experienceLevel: value as any})}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principiante">Beginner</SelectItem>
                      <SelectItem value="intermedio">Intermediate</SelectItem>
                      <SelectItem value="avanzato">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frequency">Weekly Frequency</Label>
                  <Select 
                    value={profile.weeklyFrequency?.toString() || ''} 
                    onValueChange={(value) => setProfile({...profile, weeklyFrequency: parseInt(value)})}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Times per week" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 time per week</SelectItem>
                      <SelectItem value="2">2 times per week</SelectItem>
                      <SelectItem value="3">3 times per week</SelectItem>
                      <SelectItem value="4">4 times per week</SelectItem>
                      <SelectItem value="5">5+ times per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Main Goals</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Weight Loss', 'Muscle Gain', 'Improve Endurance', 'Increase Strength', 'Improve Flexibility', 'Tone Up'].map((goal) => (
                    <Badge
                      key={goal}
                      variant={profile.fitnessGoals?.includes(goal) ? "default" : "outline"}
                      className={`cursor-pointer ${!editingProfile ? 'pointer-events-none' : ''}`}
                      onClick={() => {
                        if (!editingProfile) return;
                        const currentGoals = profile.fitnessGoals || [];
                        if (currentGoals.includes(goal)) {
                          setProfile({...profile, fitnessGoals: currentGoals.filter(g => g !== goal)});
                        } else {
                          setProfile({...profile, fitnessGoals: [...currentGoals, goal]});
                        }
                      }}
                    >
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>

              {editingProfile && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={saveProfile}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Measurements Tab */}
        <TabsContent value="measurements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Measurement</CardTitle>
              <CardDescription>
                Track your physical progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeasurement.date}
                    onChange={(e) => setNewMeasurement({...newMeasurement, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={newMeasurement.height || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, height: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={newMeasurement.gender || ''} 
                    onValueChange={(value) => setNewMeasurement({...newMeasurement, gender: value as 'male' | 'female'})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newMeasurement.weight || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, weight: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    value={newMeasurement.waist || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, waist: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="hips">Hips (cm)</Label>
                  <Input
                    id="hips"
                    type="number"
                    value={newMeasurement.hips || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, hips: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="thighs">Thighs (cm)</Label>
                  <Input
                    id="thighs"
                    type="number"
                    value={newMeasurement.thighs || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, thighs: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="shoulders">Shoulders (cm)</Label>
                  <Input
                    id="shoulders"
                    type="number"
                    value={newMeasurement.shoulders || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, shoulders: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="arms">Arms (cm)</Label>
                  <Input
                    id="arms"
                    type="number"
                    value={newMeasurement.arms || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, arms: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="neck">Neck (cm)</Label>
                  <Input
                    id="neck"
                    type="number"
                    value={newMeasurement.neck || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, neck: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={addMeasurement}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Measurements
                </Button>
                <Button variant="outline" onClick={() => setNewMeasurement({ date: new Date().toISOString().split('T')[0] })}>
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Measurements History */}
          <Card>
            <CardHeader>
              <CardTitle>Measurements History</CardTitle>
            </CardHeader>
            <CardContent>
              {measurements.length > 0 ? (
                <div className="space-y-4">
                  {measurements.slice(0, 10).map((measurement, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline">{new Date(measurement.date).toLocaleDateString()}</Badge>
                      </div>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                         {measurement.weight && <div><span className="text-muted-foreground">Weight:</span> {measurement.weight} kg</div>}
                         {measurement.waist && <div><span className="text-muted-foreground">Waist:</span> {measurement.waist} cm</div>}
                         {measurement.hips && <div><span className="text-muted-foreground">Hips:</span> {measurement.hips} cm</div>}
                         {measurement.thighs && <div><span className="text-muted-foreground">Thighs:</span> {measurement.thighs} cm</div>}
                         {measurement.shoulders && <div><span className="text-muted-foreground">Shoulders:</span> {measurement.shoulders} cm</div>}
                         {measurement.arms && <div><span className="text-muted-foreground">Arms:</span> {measurement.arms} cm</div>}
                         {measurement.neck && <div><span className="text-muted-foreground">Neck:</span> {measurement.neck} cm</div>}
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No measurements recorded. Add your first measurement!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Fitness Goals</CardTitle>
                  <CardDescription>
                    Set and monitor your training objectives
                  </CardDescription>
                </div>
                {!showGoalForm && (
                  <Button onClick={() => setShowGoalForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Goal
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {goals.length > 0 ? (
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{goal.description}</h3>
                        <Badge>{goal.type.replace('_', ' ')}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress: {goal.current} / {goal.target} {goal.unit}</span>
                          <span>Due date: {new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} />
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            const updatedGoals = goals.map(g => 
                              g.id === goal.id 
                                ? {...g, current: Math.min(g.current + 1, g.target)} 
                                : g
                            );
                            setGoals(updatedGoals);
                            localStorage.setItem('user-fitness-goals', JSON.stringify(updatedGoals));
                          }}>
                            +1 Progress
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    You haven't set any specific goals yet.
                  </p>
                  <Button onClick={() => setShowGoalForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Goal
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activities Tab */}
        <TabsContent value="activities" className="space-y-6">
          {/* Activity Logging Form */}
          {showActivityForm && (
            <Card>
              <CardHeader>
                <CardTitle>Log Activity</CardTitle>
                <CardDescription>
                  Record your workout or physical activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activity-date">Date</Label>
                    <Input
                      id="activity-date"
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-type">Activity Type</Label>
                    <Select 
                      value={newActivity.type} 
                      onValueChange={(value) => setNewActivity({...newActivity, type: value as Activity['type']})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="strength">Strength Training</SelectItem>
                        <SelectItem value="flexibility">Flexibility/Yoga</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activity-name">Activity Name</Label>
                    <Input
                      id="activity-name"
                      placeholder="e.g., Morning Run, Push-up workout"
                      value={newActivity.name}
                      onChange={(e) => setNewActivity({...newActivity, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-duration">Duration (minutes)</Label>
                    <Input
                      id="activity-duration"
                      type="number"
                      value={newActivity.duration}
                      onChange={(e) => setNewActivity({...newActivity, duration: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-intensity">Intensity</Label>
                    <Select 
                      value={newActivity.intensity} 
                      onValueChange={(value) => setNewActivity({...newActivity, intensity: value as Activity['intensity']})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activity-calories">Calories (optional)</Label>
                    <Input
                      id="activity-calories"
                      type="number"
                      placeholder="Estimated calories burned"
                      value={newActivity.calories || ''}
                      onChange={(e) => setNewActivity({...newActivity, calories: e.target.value ? parseInt(e.target.value) : undefined})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="activity-notes">Notes (optional)</Label>
                  <Input
                    id="activity-notes"
                    placeholder="How did you feel? Any observations?"
                    value={newActivity.notes || ''}
                    onChange={(e) => setNewActivity({...newActivity, notes: e.target.value})}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={addActivity}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Activity
                  </Button>
                  <Button variant="outline" onClick={() => setShowActivityForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activities History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Activity History</CardTitle>
                {!showActivityForm && (
                  <Button onClick={() => setShowActivityForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Log New Activity
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.slice(0, 10).map((activity) => (
                    <div key={activity.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{activity.name}</h3>
                        <Badge variant="outline">{new Date(activity.date).toLocaleDateString()}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div><span className="text-muted-foreground">Type:</span> {activity.type}</div>
                        <div><span className="text-muted-foreground">Duration:</span> {activity.duration} min</div>
                        <div><span className="text-muted-foreground">Intensity:</span> {activity.intensity}</div>
                        {activity.calories && <div><span className="text-muted-foreground">Calories:</span> {activity.calories}</div>}
                      </div>
                      {activity.notes && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {activity.notes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No activities logged yet.
                  </p>
                  <Button onClick={() => setShowActivityForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Log Your First Activity
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
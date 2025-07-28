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
import { Plus, Target, TrendingUp, Scale, Calendar, Edit, Save, X } from "lucide-react";
import { toast } from "sonner";

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
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProfile, setEditingProfile] = useState(false);
  const [newMeasurement, setNewMeasurement] = useState<BodyMeasurements>({
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Load data from localStorage
    const storedProfile = localStorage.getItem('user-fitness-profile');
    const storedMeasurements = localStorage.getItem('user-measurements');
    const storedGoals = localStorage.getItem('user-fitness-goals');

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
    if (storedMeasurements) {
      setMeasurements(JSON.parse(storedMeasurements));
    }
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem('user-fitness-profile', JSON.stringify(profile));
    setEditingProfile(false);
    toast.success("Profilo aggiornato con successo!");
  };

  const addMeasurement = () => {
    if (!newMeasurement.weight && !newMeasurement.waist) {
      toast.error("Inserisci almeno peso o circonferenza vita");
      return;
    }

    const updatedMeasurements = [newMeasurement, ...measurements];
    setMeasurements(updatedMeasurements);
    localStorage.setItem('user-measurements', JSON.stringify(updatedMeasurements));
    setNewMeasurement({ date: new Date().toISOString().split('T')[0] });
    toast.success("Misurazione aggiunta!");
  };

  const calculateBMI = () => {
    if (profile.height && profile.weight) {
      const heightInM = profile.height / 100;
      return (profile.weight / (heightInM * heightInM)).toFixed(1);
    }
    return null;
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: "Sottopeso", color: "text-blue-600" };
    if (bmi < 25) return { status: "Normale", color: "text-green-600" };
    if (bmi < 30) return { status: "Sovrappeso", color: "text-yellow-600" };
    return { status: "Obeso", color: "text-red-600" };
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
                <h3 className="font-medium text-orange-900">Completa il tuo profilo</h3>
                <p className="text-sm text-orange-700">
                  Completa le informazioni per ricevere piani personalizzati dall'AI trainer
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Panoramica</TabsTrigger>
          <TabsTrigger value="profile">Profilo</TabsTrigger>
          <TabsTrigger value="measurements">Misurazioni</TabsTrigger>
          <TabsTrigger value="goals">Obiettivi</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Profilo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.age && <div className="flex justify-between"><span>Età:</span><span>{profile.age} anni</span></div>}
                {profile.gender && <div className="flex justify-between"><span>Sesso:</span><span className="capitalize">{profile.gender}</span></div>}
                {profile.height && <div className="flex justify-between"><span>Altezza:</span><span>{profile.height} cm</span></div>}
                {profile.weight && <div className="flex justify-between"><span>Peso:</span><span>{profile.weight} kg</span></div>}
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
                  Ultime Misurazioni
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {latestMeasurement ? (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Data:</span><span>{new Date(latestMeasurement.date).toLocaleDateString()}</span>
                    </div>
                    {latestMeasurement.weight && <div className="flex justify-between"><span>Peso:</span><span>{latestMeasurement.weight} kg</span></div>}
                    {latestMeasurement.waist && <div className="flex justify-between"><span>Vita:</span><span>{latestMeasurement.waist} cm</span></div>}
                    {latestMeasurement.hips && <div className="flex justify-between"><span>Fianchi:</span><span>{latestMeasurement.hips} cm</span></div>}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Nessuna misurazione registrata</p>
                )}
              </CardContent>
            </Card>

            {/* Goals Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Obiettivi
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {goals.length > 0 ? (
                  goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{goal.description}</span>
                        <span>{goal.current}/{goal.target} {goal.unit}</span>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nessun obiettivo impostato</p>
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
                  <CardTitle>Informazioni Personali</CardTitle>
                  <CardDescription>
                    Queste informazioni aiutano l'AI a creare piani personalizzati
                  </CardDescription>
                </div>
                <Button
                  variant={editingProfile ? "outline" : "default"}
                  onClick={() => editingProfile ? setEditingProfile(false) : setEditingProfile(true)}
                >
                  {editingProfile ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {editingProfile ? "Annulla" : "Modifica"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Età</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Sesso</Label>
                  <Select 
                    value={profile.gender || ''} 
                    onValueChange={(value) => setProfile({...profile, gender: value as 'male' | 'female'})}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona sesso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Maschio</SelectItem>
                      <SelectItem value="female">Femmina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="height">Altezza (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={profile.height || ''}
                    onChange={(e) => setProfile({...profile, height: parseInt(e.target.value)})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight || ''}
                    onChange={(e) => setProfile({...profile, weight: parseInt(e.target.value)})}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Livello di esperienza</Label>
                  <Select 
                    value={profile.experienceLevel || ''} 
                    onValueChange={(value) => setProfile({...profile, experienceLevel: value as any})}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona livello" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principiante">Principiante</SelectItem>
                      <SelectItem value="intermedio">Intermedio</SelectItem>
                      <SelectItem value="avanzato">Avanzato</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="frequency">Frequenza settimanale</Label>
                  <Select 
                    value={profile.weeklyFrequency?.toString() || ''} 
                    onValueChange={(value) => setProfile({...profile, weeklyFrequency: parseInt(value)})}
                    disabled={!editingProfile}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Volte a settimana" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 volta a settimana</SelectItem>
                      <SelectItem value="2">2 volte a settimana</SelectItem>
                      <SelectItem value="3">3 volte a settimana</SelectItem>
                      <SelectItem value="4">4 volte a settimana</SelectItem>
                      <SelectItem value="5">5+ volte a settimana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Obiettivi principali</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Perdere peso', 'Aumentare massa muscolare', 'Migliorare resistenza', 'Aumentare forza', 'Migliorare flessibilità', 'Tonificare'].map((goal) => (
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
                    Salva Modifiche
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
              <CardTitle>Aggiungi Nuova Misurazione</CardTitle>
              <CardDescription>
                Tieni traccia dei tuoi progressi fisici
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeasurement.date}
                    onChange={(e) => setNewMeasurement({...newMeasurement, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newMeasurement.weight || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, weight: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="waist">Vita (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    value={newMeasurement.waist || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, waist: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="hips">Fianchi (cm)</Label>
                  <Input
                    id="hips"
                    type="number"
                    value={newMeasurement.hips || ''}
                    onChange={(e) => setNewMeasurement({...newMeasurement, hips: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <Button onClick={addMeasurement}>
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Misurazione
              </Button>
            </CardContent>
          </Card>

          {/* Measurements History */}
          <Card>
            <CardHeader>
              <CardTitle>Storico Misurazioni</CardTitle>
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
                        {measurement.weight && <div><span className="text-muted-foreground">Peso:</span> {measurement.weight} kg</div>}
                        {measurement.waist && <div><span className="text-muted-foreground">Vita:</span> {measurement.waist} cm</div>}
                        {measurement.hips && <div><span className="text-muted-foreground">Fianchi:</span> {measurement.hips} cm</div>}
                        {measurement.arms && <div><span className="text-muted-foreground">Braccia:</span> {measurement.arms} cm</div>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nessuna misurazione registrata. Aggiungi la tua prima misurazione!
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>I Tuoi Obiettivi Fitness</CardTitle>
              <CardDescription>
                Imposta e monitora i tuoi obiettivi di allenamento
              </CardDescription>
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
                          <span>Progresso: {goal.current} / {goal.target} {goal.unit}</span>
                          <span>Scadenza: {new Date(goal.targetDate).toLocaleDateString()}</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Non hai ancora impostato obiettivi specifici.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    I tuoi obiettivi verranno creati automaticamente dall'AI trainer quando chiederai un piano personalizzato.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
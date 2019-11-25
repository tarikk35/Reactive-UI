import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../api/agent";

configure({ enforceActions: "always" });

// Experimental Feature - decorator (@)
class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        agent.Activities.list();
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        });
      });
    } catch (err) {
      runInAction("loading activities error occured", () => {
        console.error(err);
        this.loadingInitial = false;
      });
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("editing activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      runInAction("error editing activity", () => {
        console.log(err);
        this.submitting = false;
      });
    }
  };

  @action setLoadingState = (isLoading: boolean) => {
    this.loadingInitial = isLoading;
  };

  @action createActivity = async (activity: IActivity) => {
    this.setSubmitting(true);

    try {
      await agent.Activities.create(activity);
      runInAction("creating activity", () => {
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (err) {
      runInAction("error creating activity", () => {
        console.log(err);
        this.submitting = false;
      });
    }
  };

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    console.log("create");
    this.selectedActivity = undefined;
  };

  @action setSubmitting = (isSubmitting: boolean) => {
    this.submitting = isSubmitting;
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.setEditMode(false);
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("deleting activity", () => {
        this.activityRegistry.delete(id);
        this.target = "";
        this.submitting = false;
      });
    } catch (err) {
      runInAction("error deleting activity", () => {
        console.log(err);
        this.target = "";
        this.submitting = false;
      });
    }
  };

  @action setEditMode = (isEdit: boolean) => {
    this.editMode = isEdit;
  };
}

export default createContext(new ActivityStore());

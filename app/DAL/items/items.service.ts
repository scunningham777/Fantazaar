import {Injectable} from 'angular2/core';
import {Item} from './item';
import {EntityManager} from '../EntityManager';

@Injectable()
export class ItemsService {
  private entityManager: EntityManager;
  constructor(entityManager: EntityManager) {
    this.entityManager = entityManager;
  }
  
  getItemByName(itemName: string): Item {
    var createdItem = this._getItems()[itemName]; 
    return new Item(createdItem.name, createdItem.sources);
  }
  
  getAllItems() {
    return this._getItems();
  }
  
  isValidItem(itemName: string) {
    return (itemName && this._getItems().hasOwnProperty(itemName));
  }

  
  _getItems() {
    return {
      "Tournesol": {
          "name": "Tournesol",
          "sources": [
              [
                  {
                      "source": "Gemsteel",
                      "quantity_needed": 3
                  },
                  {
                      "source": "Empyreal Soul",
                      "quantity_needed": 3
                  },
                  {
                      "source": "Serpentarius",
                      "quantity_needed": 3
                  }
              ]
          ]
      },
      "Gemsteel": {
          "name": "Gemsteel",
          "sources": [
              "Montblanc reward for 8 espers",
              "90% monograph drop - lvl. 99 Red Chocobo, Ozmone Plain/Haulo Green",
              [
                  {
                      "source": "Scarletite",
                      "quantity_needed": 1
                  },
                  {
                      "source": "Damascus Steel",
                      "quantity_needed": 2
                  },
                  {
                      "source": "Hell-Gate's Flame",
                      "quantity_needed": 2
                  }
              ]
          ]
      },
      "Empyreal Soul": {
          "name": "Empyreal Soul",
          "sources": [
              "Montblanc reward at High Guardian clan rank",
              "6% steal w/TC - lvl. 99 Red Chocobo, Ozmone Plain/Haulo Green",
              [
                  {
                      "source": "Wargod's Band",
                      "quantity_needed": 2
                  },
                  {
                      "source": "Soul Powder",
                      "quantity_needed": 1
                  },
                  {
                      "source": "High Arcana",
                      "quantity_needed": 1
                  }
              ]
          ]
      },
      "Serpentarius": {
          "name": "Serpentarius",
          "sources": [
              "Montblanc reward for 13 espers",
              "80% steal w/TC - Zodiark",
              [
                  {
                      "source": "Snake Skin",
                      "quantity_needed": 4
                  },
                  {
                      "source": "Serpent Eye",
                      "quantity_needed": 2
                  },
                  {
                      "source": "High Arcana",
                      "quantity_needed": 1
                  }
              ]
          ]
      },
      "Scarletite": {
          "name": "Scarletite",
          "sources": [
              "80% steal w/TC - Aspidochelon (trophy rare), Cerobi Steppe/Feddik River (40% spawn)",
              "6% mono drop - Emeralditan, Nabreus D/Echoes of the Past, The Slumbermead",
              "50% chance to receive for perfect score in fishing game",
              "6% steal w/TC - Pandaemonium, Pharos 1st Ascent/Dunes of Profaning Wind"
          ]
      },
      "Damascus Steel": {
          "name": "Damascus Steel",
          "sources": [
              "Montblanc reward for 13 espers",
              "80% steal w/TC - Anchag, Paramina R/Karydine G (Appears once per entry to Paramina Rift, must kill all else",
              "80% steal w/TC - Bluesang (trophy rare), Cerobi Steppe/Crossfield",
              "6% mono drop - Bune, Pharos second ascent, Penumbra north"
          ]
      },
      "Hell-Gate's Flame": {
          "name": "Hell-Gate's Flame",
          "sources": [
              "5% mono drop or poach - Cerberus, Feywood/Walk of Stolen Truths",
              "5% poach - Wary Wolf, Mosphoran H/Summit Path"
          ]
      },
      "Wargod's Band": {
          "name": "Wargod's Band",
          "sources": [
              "5% mono drop - Leynir, Nabreus D/Lifeless Strand",
              "6% steal w/TC - Victanir (trophy rare), Nam-Yensa S/Yellow Sands"
          ]
      },
      "Soul Powder": {
          "name": "Soul Powder",
          "sources": [
              "Reward for Ixtab hunt ('The Dead Ought Sleep Forever')",
              "10% mono drop, 6% steal w/TC - Etem, Henne Mines/Special Charter Shaft",
              "6% steal w/TC - Vorres (trophy rare), Necrohol/Hall of the Ivory Covenant (must provoke dark elemental)"
          ]
      },
      "High Arcana": {
          "name": "High Arcana",
          "sources": [
              "Montblanc reward for 4 espers",
              "Montblanc reward at Paragon of Justice clan rank",
              "5% Canopic Jar drop - any respawnable rare game",
              "6% steal w/TC - most espers",
              [
                  {
                      "source": "Arcana",
                      "quantity_needed": 10
                  },
                  {
                      "source": "Feystone",
                      "quantity_needed": 1
                  },
                  {
                      "source": "Soul of Thamasa",
                      "quantity_needed": 1
                  }
              ]
          ]
      },
      "Snake Skin": {
          "name": "Snake Skin",
          "sources": [
              "95% poach, 80% steal w/TC, 40-55% drop - Wildsnake, Giza P Dry/Toam Hills (only one at a time)",
              "10% mono drop, 6% steal w/TC - Etem, Henne Mines/Special Charter Shaft",
              "6% steal w/TC - Vorres (trophy rare), Necrohol/Hall of the Ivory Covenant (must provoke dark elemental)"
          ]
      },
      "Serpent Eye": {
          "name": "Serpent Eye",
          "sources": [
              "Reward for Marilith hunt ('A Tingling Toast')",
              "8% mono drop - Basilisk, Feywood/White ME, Ice FoC, Edge oR",
              "5% poach - Grey Molter (rare), Mosphoran H/Empyrean Way"
          ]
      },
      "Arcana": {
          "name": "Arcana",
          "sources": [
              "Mono drop - most rare game",
              "Canopic jar drop - all enemies"
          ]
      },
      "Feystone": {
          "name": "Feystone",
          "sources": [
              "Drop, steal - most elementals and entites",
              "30% steal w/TC - crystalbugs, Stillshrine oM, Sochen CP, Nabreus D",
              "30% steal w/TC - Elder wyrm(boss), Golmore J/Dell of the Dreamer",
              "1-5% drop - Bangaa Thief, Cerobi Steppe/Old Elanise Road"
          ]
      },
      "Soul of Thamasa": {
          "name": "Soul of Thamasa",
          "sources": [
              "Reward for Deathscythe hunt ('Dead City Watch')",
              "6% mono drop - Oversoul, Necrohol oN/Ho Slumbering M, Hot Ivory C, Cot Highborn, Co Distant S, Ho Effulgent L",
              "80% steal w/TC - Ishteen (rare), Barheim Passage/East-West B, The Zeviah S (spawn chance increases over time)"
          ]
      }
    }
  }
}
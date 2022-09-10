//
//  Variables.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/22/22.
//

import Foundation
import UIKit

class Variables: ObservableObject {
    @Published var friendlyName:String = ""
    @Published var name:String = ""
    
    @Published var prevPeriod:String = ""
    @Published var currentPeriod:String = ""
    @Published var nextPeriod:String = ""
    
    @Published var currentStart:String = ""
    @Published var currentEnd:String = ""
    @Published var nextStart:String = ""
    @Published var nextEnd:String = ""
    @Published var prevStart:String = ""
    @Published var prevEnd:String = ""
    @Published var to:String = ""
    @Published var pto:String = ""
    @Published var nto:String = ""
    
    @Published var periodNum:String = ""
    
    @Published var isHidden = true
    
    @Published var scroll:String = ""
}

class Periods:ObservableObject, Identifiable{
    @Published var id = UUID()
    @Published var name:String
    @Published var index: Int
    @Published var startTime:String
    @Published var endTime:String
    
    init (name:String, index:Int, startTime: String, endTime:String){
        self.name = name
        self.index = index
        self.startTime = startTime
        self.endTime = endTime
    }
}

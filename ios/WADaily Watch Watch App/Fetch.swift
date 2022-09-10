//
//  Fetch.swift
//  WADaily WatchKit Extension
//
//  Created by Grant Andrews on 4/20/22.
//

import Foundation

class apiCall {
    func getSchedule(completion:@escaping (ScheduleGroup) -> ()) {
        guard let url = URL(string: "https://wadaily.co/api/schedule") else { return }
        
        URLSession.shared.dataTask(with: url) { (data, _, _) in
            let schedules = try! JSONDecoder().decode(ScheduleGroup.self, from: data!)
            
            DispatchQueue.main.async {
                completion(schedules)
            }
        }
        .resume()
    }
}
